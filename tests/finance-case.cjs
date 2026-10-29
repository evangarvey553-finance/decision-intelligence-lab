const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const context = { module: { exports: {} } };
vm.runInNewContext(html.match(/<script>([\\s\\S]*?)<\/script>/)[1], context);
const m = context.module.exports;
const eq = (a,b) => assert.ok(Math.abs(a-b)<1e-7, a+' != '+b);
eq(m.calc().fy,20650);
eq(m.calc({timing:true}).fy,20650);
eq(m.calc({duplicate:true}).fy,20595);
const action = {discount:8,start:10,labor:2,seats:120,timing:true,duplicate:true,support:true};
const r=m.calc(action);eq(r.q3,5155);eq(r.net,147);eq(r.fy,20448);eq(r.q4,5293);eq(r.issues,0);
assert.ok(m.calc({discount:1,start:12}).net<0);
assert.ok(m.calc({...action,start:12}).fy>r.fy);
for(let i=0;i<5;i++){eq(m.sum(m.ledger.filter(x=>x.cat===i&&x.month>=7).map(x=>x.posted)),m.reported[i]);eq(m.sum(m.ledger.filter(x=>x.cat===i).map(x=>x.budget)),3*m.budget[i]);}
for(const timing of [false,true])for(const duplicate of [false,true])for(const discount of [0,1,8,12])for(const start of [10,11,12])for(const growth of [0,5,10]){const s=m.calc({timing,duplicate,discount,start,growth,labor:4,seats:150});eq(s.fy,20650-s.correction+s.demand-s.net);eq(s.q3,m.sum(s.actual));eq(s.q3-5000,m.sum(s.variance));}
assert.equal(m.ledger.length,45);eq(m.sum(m.ledger.map(x=>x.posted)),15290);
console.log('PASS: source totals, known outcomes, timing conservation, and 144 scenario reconciliations.');
