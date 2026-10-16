const {spawn}=require('node:child_process');
const path=require('node:path');
const suites=['v2','v3','v5','v6','v7','v8','v9','v10','v11','v12','v13','v14','v15','v16','v17','v18','v19'];
async function runSuite(version){return new Promise(resolve=>{
 const child=spawn(process.execPath,[path.join(__dirname,'check-'+version+'.cjs')],{stdio:['ignore','pipe','pipe']});
 let output='',errors='',settled=false;
 const timer=setTimeout(()=>{child.kill();finish(false,'timed out')},60000);
 function finish(ok,reason=''){if(settled)return;settled=true;clearTimeout(timer);if(output)process.stdout.write(output);if(errors)process.stderr.write(errors);if(!ok)console.error('INCOMPLETE OR FAILED SUITE',version,reason);resolve(ok)}
 child.stdout.on('data',x=>output+=x);child.stderr.on('data',x=>errors+=x);
 child.on('error',err=>finish(false,err.message));
 child.on('close',code=>finish(code===0&&/^CHECKS /m.test(output),'exit '+code));
})}
(async()=>{let failed=false;for(const version of suites)if(!await runSuite(version))failed=true;if(failed)process.exitCode=1})().catch(err=>{console.error(err);process.exitCode=1});
