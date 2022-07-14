const fs = require("fs");
const path = require("path");
const list = fs.readdirSync(".");
for (const file of list){
	if (file.indexOf("-") != -1){
		const parts = file.split("-");
		if ( !fs.existsSync(parts[0]) )
			fs.mkdirSync(parts[0]);
		if ( !fs.existsSync( path.join(parts[0], parts[1])) )
			fs.mkdirSync( path.join(parts[0], parts[1]) );
		fs.renameSync( file, path.join(parts[0], parts[1], parts[2]) )
	}
}