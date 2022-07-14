const fs = require("fs");
const path = require("path");

for (const year of fs.readdirSync(".")){
	if (isNaN(+year)) continue;
	console.log(year)

	for (const month of fs.readdirSync(year)){
		if (isNaN(+month)) continue;
		console.log(year, month)

		let visits = 0; //访问数
		const ips = new Set(); //人数
		let durations = 0; //总时长 可计算得平均访问时长 和 人均访问时长
		const urls = new Set();
		const platforms = new Set();
		const langs = new Set();

		const files = fs.readdirSync( path.join(year, month) );
		for (const file of files){
			if ( isNaN(+file.split(".")[0]) ) continue;

			const arr = fs.readFileSync( path.join(year, month, file) )
				.toString().trim().split("\n")
				.map( line => JSON.parse(line.trim()) );
			visits += arr.length;
			for (const line of arr){
				ips.add( line.ip.split(",")[0] );
				durations += line.leaveTime - line.intoTime;
				urls.add( line.url );
				platforms.add( line.platform );
				langs.add( line.language );
			}
		}
		fs.writeFileSync(path.join(year, month, "total.json"), JSON.stringify({
			visits,
			ips: [...ips],
			durations,
			urls: [...urls],
			platforms: [...platforms],
			langs: [...langs]
		}));
	}


	let visits = 0; //访问数
	const ips = new Set(); //人数
	let durations = 0; //总时长 可计算得平均访问时长 和 人均访问时长
	const urls = new Set();
	const platforms = new Set();
	const langs = new Set();
	for (const month of fs.readdirSync(year)){
		if (isNaN(+month)) continue;
		const json = JSON.parse(
			fs.readFileSync( path.join(year, month, "total.json") ).toString()
		);
		visits += json.visits;
		json.ips.forEach(ip => ips.add(ip));
		durations += json.durations;
		json.urls.forEach(ip => urls.add(ip));
		json.platforms.forEach(ip => platforms.add(ip));
		json.langs.forEach(ip => langs.add(ip));
	}
	fs.writeFileSync(path.join(year, "total.json"), JSON.stringify({
		visits,
		ips: [...ips],
		durations,
		urls: [...urls],
		platforms: [...platforms],
		langs: [...langs]
	}));
}


let visits = 0; //访问数
const ips = new Set(); //人数
let durations = 0; //总时长 可计算得平均访问时长 和 人均访问时长
const urls = new Set();
const platforms = new Set();
const langs = new Set();
for (const year of fs.readdirSync(".")){
	if (isNaN(+year)) continue;
	const json = JSON.parse(
		fs.readFileSync( path.join(year, "total.json") ).toString()
	);
	visits += json.visits;
	json.ips.forEach(ip => ips.add(ip));
	durations += json.durations;
	json.urls.forEach(ip => urls.add(ip));
	json.platforms.forEach(ip => platforms.add(ip));
	json.langs.forEach(ip => langs.add(ip));
}
fs.writeFileSync("total.json", JSON.stringify({
	visits,
	ips: [...ips],
	durations,
	urls: [...urls],
	platforms: [...platforms],
	langs: [...langs]
}));

