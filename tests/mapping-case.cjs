const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8'),ctx={module:{exports:{}}};
vm.runInNewContext(html.split('<script>')[1].split('</script>')[0],ctx);
const m=ctx.module.exports,src=m.source,original=JSON.stringify(src.records),baseline=src.summarize();
assert.equal(baseline.posted,381.5);assert.equal(baseline.accepted,304.5);assert.equal(baseline.held,77);assert.equal(baseline.heldCount,3);assert.equal(baseline.cutoff,80);
assert.equal(baseline.rows[1].master.id,'B-100');
assert.equal(src.resolve('S-06','B-100',true).ok,false);
assert.equal(src.resolve('S-06','B-110',false).ok,false);
assert.equal(src.summarize({'S-06':{budgetID:'B-100'}}).heldCount,3);
const choices=[['S-05','B-200'],['S-06','B-110'],['S-07','B-300']];
for(let mask=0;mask<8;mask++){
 const mappings={};for(let i=0;i<3;i++)if(mask&(1<<i)){const [id,budget]=choices[i],r=src.resolve(id,budget,true);assert.equal(r.ok,true);mappings[id]=r.mapping;}
 const s=src.summarize(mappings),f=m.calc({mappings}),c=m.calc({mappings,timing:true});
 assert.equal(s.posted,s.accepted+s.held);assert.equal(f.fy,20650);assert.equal(c.fy,20650);assert.equal(c.q3,5210);
 if(mask===7){assert.equal(s.heldCount,0);assert.equal(s.accepted,381.5);assert.equal(m.calc({mappings,discount:8,start:10,labor:2,seats:120,timing:true,duplicate:true,support:true}).fy,20448);}
}
assert.equal(JSON.stringify(src.records),original);
assert.equal(m.reported[1],708.5+baseline.posted);
assert.equal(m.ledger.find(x=>x.month===9&&x.cat===1).posted,baseline.posted);
console.log('PASS: detection, evidence rejection, all eight resolution states, preserved raw records, source-to-forecast reconciliation and timing conservation.');
