/*
work.js 化学Helper 后台工作线程
　┐ ├┬─┐ ┌──┼┼┐
　│ ││　 ┌──┼┼┐
│╯├─┐ ╭──┴╯			W
└╯│   ┌────┐			Z
　│　├─┐ ├────┤		H
　╰┘└　 └────╯
化学Helper Copyright © 2020 by wzh
保留一切权利
*/
function omit(n){
	return n==1? "": n;
}
function small(n){
	return "<sub>"+n+"</sub>";
	//return [...String(n)].map(v => small.c[v]).join("");
}
small.c = "₀₁₂₃₄₅₆₇₈₉";
function* range(r){
	switch (r){
		case "N+": {
			let i = 1;
			while (true)
				yield {x: i++};
			break;
			}
		case "-N+": {
			let i = -1;
			while (true)
				yield {x: i--};
			break;
			}
		case "+Q": {
			let total = 2;
			while (total++)
				for (let x=1; x<total; x++)
					yield {x: x/(total-x), s: x, p: total-x};
			break;
			}
		case "-Q": {
			let total = 2;
			while (total++)
				for (let x=1; x<total; x++)
					yield {x: -x/(total-x), s: -x, p: total-x};
			break;
		}
	}
}
self.onmessage = function(e){
	switch (e.data.type){
		case "expression":
			let {value:exp, start, end} = e.data;
			let args = {
				b: [ // b: KClO3
					...exp.split("--")[0].split("+").map(f => [ // f: KClO3
						...f.replace(/([A-Z][a-z]*[0-9]*)/g, "$1\n").split("\n").slice(0,-1).map(v => { // v: O3
							return {
								n: v.replace(/([0-9]*$)/g, "\n$1").split("\n").slice(0,-1)[0], // n: O
								s: v.replace(/([0-9]*$)/g, "\n$1").split("\n").slice(0,-1)[1] || 1 // s: 3
							};
						})
					])
				],
				a: [ // a: KCl+O2
					...exp.split("--")[1].split("+").map(f => [ // f: KCl
						...f.replace(/([A-Z][a-z]*[0-9]*)/g, "$1\n").split("\n").slice(0,-1).map(v => { // v: K
							return {
								n: v.replace(/([0-9]*$)/g, "\n$1").split("\n").slice(0,-1)[0], // n: K
								s: v.replace(/([0-9]*$)/g, "\n$1").split("\n").slice(0,-1)[1] || 1 // s: 1
							};
						})
					])
				]
			};
			
			let js = "let v={};", chars = "bcfghlmnopqrstuvwxzMadeByWZH_COPYRIGHT".split(""), index=0;
			let choice = {b:[], a:[], ib:0, ia:0};
			if (args.a.length + args.b.length > chars.length) return alert("反应物与生成物过多！");
			for (let i in args.b){
				let char = chars[index++];
				choice.b.push(char);
				js += `for (v.${char}=${start}; v.${char}<${end}; v.${char}++)`;
			}
			for (let j in args.a){
				let char2 = chars[index++];
				choice.a.push(char2);
				js += `for (v.${char2}=${start}; v.${char2}<${end}; v.${char2}++)`;
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
		case "equation_dichotomy":
			
		case "equation_violence":
			if (e.data.range == "0"){
				let x = 0;
				self.postMessage({x, e:eval(e.data.equation)});
				self.close();
			}
			let r = range(e.data.range);
			r.next();
			setInterval(()=>{
				let {x,s,p} = r.next().value; 
				if (s/p == Math.round(s/p)) s = p = null;
				self.postMessage({x, s, p, e:eval(e.data.equation)});
			}, 0);
			break;
		default:
			throw "type ERROR:"+type;
	}
}
