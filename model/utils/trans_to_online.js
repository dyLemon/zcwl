const fs=require('fs');

const filePath='../index.html';

const patts={
	statsRemove:{
		script:/<script src="\/public_static\/model_lib\/stats\.min\.js"><\/script>/,
		var:/var stats[\s\S]+?\n/,
		update:/stats\.update\(\);?/,
	},
	domain:/\/public_static\//g,
	minVue:/\/vue\.js/,
	minThree:/\/three\.js/,
	pathName:/(http:\/\/127\.0\.0\.1:7777|http:\/\/192\.168\.5\.133:7777)/g,
	testMode:/\(function testMode\(\){[\s\S]+?}\)\(\);/,
	console:/\s*console\.log\(.*?\)(\n|\r\n|\n\r)/g,

	port:/port\s?=\s?7777/,
	resourcePath:/E:\/\/project\/model\/model\//,
	allowOrigin:/allowOrigin\s?=\s?'\*'/,
	orginLimitComment:/\/\/\s?res\.end\('0'\); return;?/,
};

html();
server();

async function html(){
	try {
		let file=await readFile(filePath);
		file=file.replace(patts.statsRemove.script,'')
			.replace(patts.statsRemove.var,'')
			.replace(patts.statsRemove.update,'')
			.replace(patts.domain,'http://static.zc5l.com/')
			.replace(patts.minVue,'/vue.min.js')
			.replace(patts.minThree,'/three.min.js')
			.replace(patts.pathName,'http://106.15.188.10')
			.replace(patts.testMode,'')
			.replace(patts.console,'\n')
		let result=await writeFile('index.html',file);
		console.log(result+' html');
	} catch (e){
		throw e;
	}	
}

async function server(){
	try {
		let file=await readFile('../server/model_view.index.js');
		file=file.replace(patts.port,'port=80')
			.replace(patts.resourcePath,'D://ftp_data_ext/MeshFiles')
			.replace(patts.allowOrigin,"allowOrigin='http://model.zc5l.com'")
			.replace(patts.orginLimitComment,"res.end('0'); return;")
		let result=await writeFile('model_view.index.js',file);
		console.log(result+' server');
	} catch (e){
		throw e;
	}
}

async function readFile(filePath){
	return new Promise((resolve,reject)=>{
		fs.readFile(filePath,'utf8',(err,file)=>{
			if (err) reject(err);
			resolve(file);
		});
	});
}

async function writeFile(fileName,data){
	return new Promise((resolve,reject)=>{
		fs.writeFile(fileName,data,(err)=>{
			if (err) reject(err);
			resolve('success');
		});
	});
}