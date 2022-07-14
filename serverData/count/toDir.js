const fs = require("fs");
const path = require("path");
const list = fs.readdirSync(__dirname);
for (const file of list){
	if (file.indexOf("-") != -1){
		const parts = file.split("-");
		if (!fs.existsSync( path.join(__dirname, parts[0]) ))
			fs.mkdirSync(path.join(__dirname, parts[0]));
		if (!fs.existsSync( path.join(__dirname, parts[0], parts[1]) ))
			fs.mkdirSync(path.join(__dirname, parts[0], parts[1]));
		fs.renameSync(path.join(__dirname, file), path.join(__dirname, parts[0], parts[1], parts[2]))
	}
}