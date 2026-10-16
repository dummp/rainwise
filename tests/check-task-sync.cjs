const {makeFixture}=require('./fixture-v20.cjs'),assert=require('node:assert/strict');
for(const historical of [false,true]){
 const f=makeFixture(),{run,ctx,saved}=f;
 run(`v3SaveIdentity('user');v14Mode('${historical?'history':'now'}');V14.guideIndex=null`);
 ctx.t=run("v14CreateTask({title:'同步测试任务',place:'罗湖',detail:'虚构演示：在室内整理公开公告，交付清单与原文链接',category:'其他',duration:15,reward:0,rewardType:'无偿互助'})");
 run("v3SaveIdentity('maintainer')");ctx.input={id:ctx.t.id,status:'待接单',note:'同步测试：任务内容与交付标准已核对',storageKey:run("v9StorageKey('sy-v7-tasks')"),expectedUpdated:ctx.t.updated,expectedRevision:0};run('v24UpdateTask(input)');
 run("v3SaveIdentity('user');V14.taskTab='mine';V14.taskStatus='全部'");assert.equal(run('v7Rows().find(t=>t.id===input.id).status'),'待接单');assert(run('v5Community()').includes(ctx.input.note));
 const fresh=makeFixture({...saved});fresh.ctx.id=ctx.t.id;assert.equal(fresh.run('v7Rows().find(t=>t.id===id).status'),'待接单');
 run("v3SaveIdentity('maintainer')");assert.throws(()=>run('v24UpdateTask(input)'),/已被更新/);
 console.log('PASS',historical?'Historical':'Current','maintenance update reaches user card and survives reload; stale write rejected');
}
