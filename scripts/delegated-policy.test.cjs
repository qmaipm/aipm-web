// node --test scripts/delegated-policy.test.cjs — no added runtime dependencies.
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const filename = resolve('lib/delegated-policy.ts');
const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const mod = new Module(filename); mod.filename = filename; mod.paths = module.paths; mod._compile(compiled, filename);
const p = mod.exports;
const max = { location: 5, transport: 4, amenities: 3, strategy: 3, area: 100000, revenue: 10000000, occupancy: 90, guarantee: 5, staff: 50 };
test('full scale is 100; unknown is not zero or a confirmed grade', () => {
 assert.equal(p.scoreProject(max).total,100);
 assert.equal(p.scoreProject(p.EMPTY_ASSESSMENT).grade,null);
 assert.equal(p.scoreProject({...max,staff:null}).total,null);
});
test('all numerical band boundaries match whitepaper', () => {
 for(const bands of Object.values(p.BANDS)) for(let i=0;i<bands.length;i++) {
  const [threshold,score]=bands[i];assert.equal(p.bandScore(threshold,bands),score);
  if(threshold>0)assert.equal(p.bandScore(threshold-.0001,bands),bands[i+1][1]);
 }
 for(const [n,g] of [[59,'reserve'],[60,'C'],[69,'C'],[70,'B'],[79,'B'],[80,'A'],[100,'A']])assert.equal(p.gradeForScore(n),g);
});
test('occupancy guarantee corrects points, not actual occupancy', () => {
 const a={...max,occupancy:10};assert.equal(p.scoreProject(a).dimensions[3].score,13);assert.equal(a.occupancy,10);
 assert.equal(p.scoreProject({...a,guarantee:3}).dimensions[3].score,5);
});
test('headcount and density intentionally increase score; no area exclusion', () => {
 const a={...max,area:25000,revenue:1500000,staff:8};
 assert.equal(p.scoreProject(a).total,59);
 assert.equal(p.scoreProject({...a,staff:30}).total,72);
 assert.equal(p.scoreProject({...max,area:9000}).grade,'A');
});
test('V2 page 20 example and all roles', () => {
 for(const [role,total] of [['develop',355000],['assist',266250],['refer',177500]])assert.equal(p.estimateReturns('A',role,true,300000,800000,36).total,total);
});
test('S is an additional bonus, not a grade change; reserve gets no standard reward', () => {
 const base=p.estimateReturns('B','refer',false,300000,800000,36);
 const s=p.estimateReturns('B','refer',true,300000,800000,36);
 assert.equal(s.total-base.total,10000);assert.equal(s.fixedRate,base.fixedRate);
 assert.equal(p.estimateReturns('reserve','develop',true,300000,800000,36).total,0);
});
test('zero performance, partial periods, fractional roles', () => {
 assert.equal(p.estimateReturns('A','develop',true,300000,0,12).total,145000);
 assert.equal(p.estimateReturns('A','assist',false,300000,0,6).fixed,16875);
 assert.equal(p.estimateReturns('A','refer',false,0,0,36).opening,40000);
});
test('invalid values are rejected, not silently coerced', () => {
 for(const a of [{...max,area:0},{...max,staff:1.5},{...max,occupancy:101},{...max,revenue:NaN},{...max,strategy:5},{}])assert.ok(p.validateAssessment(a));
 for(const month of [0,37,1.5,NaN])assert.throws(()=>p.estimateReturns('A','refer',false,1,1,month));
 assert.throws(()=>p.estimateReturns('A','refer',false,-1,1,12));
});

const presentationFile = resolve('lib/delegated-presentation.ts');
const presentationCompiled = ts.transpileModule(readFileSync(presentationFile, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const presentationModule = new Module(presentationFile); presentationModule.filename = presentationFile; presentationModule.paths = module.paths; presentationModule._compile(presentationCompiled, presentationFile);
const ui = presentationModule.exports;
test('public directions map every unchanged policy grade without exposing scores', () => {
 assert.deepEqual(Object.keys(ui.COOPERATION_DIRECTIONS), Object.keys(p.GRADES));
 for (const [grade, label] of [['A','甄选合作'],['B','优选合作'],['C','精选合作'],['reserve','合作探索']]) {
  assert.equal(ui.COOPERATION_DIRECTIONS[grade].label,label);
  assert.doesNotMatch(ui.COOPERATION_DIRECTIONS[grade].description, /[ABC]级|储备|谨慎开发|分数/);
 }
});
test('short options keep every policy value, including explicit zero and unknown', () => {
 for (const [key, choices] of Object.entries(p.CHOICES)) {
  const copy=ui.PROJECT_CHOICES[key];
  assert.deepEqual(Object.keys(copy.labels).map(Number).sort(), choices.map(([v])=>v).sort());
  for (const [value] of choices) {
   assert.ok(copy.labels[value].length<=11);
   assert.doesNotMatch(copy.labels[value], /[0-9]|分$/);
   assert.equal(ui.assessmentInputValue(key,String(value)),value);
  }
  assert.equal(ui.assessmentInputValue(key,''),null);
 }
 assert.match(ui.PROJECT_CHOICES.guarantee.hint,/全部空置面积/);
 assert.match(ui.PROJECT_CHOICES.guarantee.hint,/书面、可执行/);
 assert.match(ui.PROJECT_CHOICES.guarantee.hint,/口头承诺不算/);
});
test('revenue input uses ten-thousand yuan; payload and score still use yuan', () => {
 for (const value of [0,79.9999,80,150,300,600,1000,100000000]) {
  const yuan=ui.assessmentInputValue('revenue',String(value));
  assert.equal(yuan,value*10000);
  assert.ok(Math.abs(ui.assessmentDisplayValue('revenue',yuan)-value)<1e-9);
 }
 assert.equal(ui.assessmentInputValue('revenue',''),null);
 assert.equal(ui.assessmentDisplayValue('revenue',null),'');
 const sample={location:4,transport:3,amenities:2,strategy:1,area:50000,revenue:ui.assessmentInputValue('revenue','300'),occupancy:50,guarantee:0,staff:30};
 assert.equal(p.scoreProject(sample).total,67);
 assert.equal(ui.COOPERATION_DIRECTIONS[p.scoreProject(sample).grade].label,'精选合作');
 assert.equal(p.scoreProject({...sample,guarantee:5}).total,76);
 assert.equal(ui.COOPERATION_DIRECTIONS[p.scoreProject({...sample,guarantee:5}).grade].label,'优选合作');
});
test('progress groups cover all inputs exactly once; missing information stays incomplete', () => {
 const keys=ui.PROJECT_SECTIONS.flatMap(s=>s.keys);
 assert.deepEqual([...keys].sort(),Object.keys(p.EMPTY_ASSESSMENT).sort());
 assert.equal(new Set(keys).size,keys.length);
 for(const key of keys)assert.equal(p.scoreProject({...max,[key]:null}).grade,null);
});
