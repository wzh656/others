/*
　┐ ├┬─┐ ┌──┼┼┐
　│ ││　 ┌──┼┼┐
│╯├─┐ ╭──┴╯			W
└╯│   ┌────┐			Z
　│　├─┐ ├────┤		H
　╰┘└　 └────╯
Copyright © 2020 by wzh
保留一切权利
*/
function omit(n){
	return n==1? "": n;
}
function small(n){
	return [...String(n)].map(v => small.c[v]).join("");
}
small.c = "₀₁₂₃₄₅₆₇₈₉";
self.onmessage = function(e){
	let type = e.data.type;
	switch (type){
		case "expression":
			let exp = e.data.value;
			let args = {
				b: exp.split("--")[0].split("+"),
				a: exp.split("--")[1].split("+")
			};
			for (let i in args.b){ //每种反应物
				console.log(args.b[i], args.b[i].replace(/([A-Z][0-9a-z]*)/g, "$1\n").split("\n").slice(0,-1));
				args.b[i] = args.b[i].replace(/([A-Z][0-9a-z]*)/g, "$1\n").split("\n").slice(0,-1);
				for (let j in args.b[i]){
					console.log(args.b[i][j], args.b[i][j].replace(/([0-9]*$)/g, "\n$1").split("\n").slice(0,-1));
					let t = args.b[i][j].replace(/([0-9]*$)/g, "\n$1").split("\n").slice(0,-1);
					args.b[i][j] = {
						n: t[0],
						s: t[1]||1
					}
				}
			}
			for (let i in args.a){ //每种生成物
				// console.log(args.a[i], args.a[i].replace(/([A-Z][0-9a-z]*)/g, "$1\n").split("\n").slice(0,-1));
				args.a[i] = args.a[i].replace(/([A-Z][0-9a-z]*)/g, "$1\n").split("\n").slice(0,-1);
				for (let j in args.a[i]){
					console.log(args.a[i][j], args.a[i][j].replace(/([0-9]*$)/g, "\n$1").split("\n").slice(0,-1));
					let t = args.a[i][j].replace(/([0-9]*$)/g, "\n$1").split("\n").slice(0,-1);
					args.a[i][j] = {
						n: t[0],
						s: t[1]||1
					}
				}
			}
			console.log(exp, args)
			
			let js = "let v={};", chars = "bcfghlmnopqrstuvwxzMadeByWZH_COPYRIGHT".split(""), index=0;
			let choice = {b:[], a:[], ib:0, ia:0};
			if (args.a.length + args.b.length > chars.length) return alert("反应物与生成物过多！");
			for (let i in args.b){
				let char = chars[index++];
				choice.b.push(char);
				js += `for (v.${char}=1; v.${char}<10; v.${char}++)`;
			}
			for (let j in args.a){
				let char2 = chars[index++];
				choice.a.push(char2);
				js += `for (v.${char2}=1; v.${char2}<10; v.${char2}++)`;
			}
			js += `{
choice.ia = choice.ib = 0;
let s = {};
for (let i in args.b){
	for (let j in args.b[i]){
		s[args.b[i][j].n] = (s[args.b[i][j].n]||0) + args.b[i][j].s * v[choice.b[choice.ib]];
	}
	choice.ib++;
}
for (let i in args.a){
	for (let j in args.a[i]){
		s[args.a[i][j].n] = (s[args.a[i][j].n]||0) - args.a[i][j].s * v[choice.a[choice.ia]];
	}
	choice.ia++;
}
let bool = true;
for (let i in s) if (s[i] != 0) bool=false;
choice.ia = choice.ib = 0;
if (bool) self.postMessage(
	args.b.map(
		deep1 =>
			omit( v[choice.b[choice.ib++]] )+
			deep1.map(deep2 => deep2.n+small(omit(deep2.s))).join("")
	).join("+")
	+"=="+args.a.map(
		deep1 =>
			omit( v[choice.a[choice.ia++]] )+
			deep1.map(deep2 => deep2.n+small(omit(deep2.s))).join("")
	).join("+")
);
};
self.postMessage(null);`
			eval(js);
			break;
		default:
			throw "type ERROR:"+type;
	}
}
