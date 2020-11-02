<!DOCTYPE html>
<!--
　┐ ├┬─┐ ┌──┼┼┐
　│ ││　 ┌──┼┼┐
│╯├─┐ ╭──┴╯			W
└╯│   ┌────┐			Z
　│　├─┐ ├────┤		H
　╰┘└　 └────╯
Copyright © 2020 by wzh
保留一切权利
-->
<html lang="zh">
	<head>
		<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<title>chemistry</title>
		<script src="https://lib.baomitu.com/jquery/3.5.0/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
		<script src="https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js"></script>
		<script>eruda.init();</script>
		<script>new VConsole();</script>
<style>
body, input, button, body>label{ /* 背景色 */
	background-color: #fffae8;
}
input[type="radio"]{ /* 隐藏选择 */
	display: none;
}
input:not(:checked) + div{ /* 仅选择的显示 */
	display: none;
}

nav{ /* 导航栏 */
	width: 100%;
	overflow-x: scroll;
	display: flex;
	justify-content: space-around;
}
nav label{ /* 导航栏选项 */
	text-align: center;
	display: inline-block;
	color: #876;
	width: 30vw;
	margin: 0 1vw;
	border: 0.6vw outset #876;
}
h1{
	text-align: center;
	margin-left: 0;
}
h1, h2, h3{ /* 标题 */
	color: #aa6;
	margin-left: 6px;
	text-shadow:
		0px 0px 6px #e0edd3,
		0px 0px 12px #e0edd3,
		0px 0px 18px #e0edd3,
 		0px 0px 24px #e0edd3,
		0px 0px 36px #e0edd3,
		0px 0px 42px #e0edd3,
		0px 0px 6px #e0edd3,
		0px 0px 12px #e0edd3,
		0px 0px 18px #e0edd3,
 		0px 0px 24px #e0edd3,
		0px 0px 36px #e0edd3,
		0px 0px 42px #e0edd3;
}
p{
	text-shadow:
		0px 0px 6px #e0edd3,
		0px 0px 12px #e0edd3,
		0px 0px 18px #e0edd3,
 		0px 0px 24px #e0edd3,
		0px 0px 36px #e0edd3;
	border-bottom: 1px solid black;
	margin: 3vw;
	padding: 3vw;
}
button{ /* 按钮 */
	border-radius: 1vw;
	margin-top: 0.6vh;
}
input:focus, li:active, button:active, label:active{ /* 被点击高亮 */
	background-color: #e0edd3;
}

input:not([type]){ /* 输入文本框 */
	width: 80%;
	border-radius: 1vw;
}

ul{ /* 结果列表 */
	display: block;
	padding: 0;
	/*overflow-x: auto;*/
}
ul > li{ /* 结果列表项 */
	display: block;
	border: 0.6vw inset #e0edd3;
	border-radius: 2vw;
	padding: 1vw;
	margin: 1vw;
	overflow-x: auto;
}
div > ul > li:first-of-type:not(.msg){ /* 高亮第一 */
	background-color: #e0edd3;
}
div > ul > li:first-of-type:not(.msg):before{
	content: "最简：";
	font-weight: bold;
}
div > ul > li:first-of-type:not(.msg):after{
	content: "\a（请添加反应条件及上下键）";
	white-space: pre;
	font-weight: bold;
}
div > ul > li.msg.finished:last-of-type{ /* 高亮最后完成信息 */
	background-color: #d3ede0;
	text-align: center;
}
div > ul > li.msg.stopped:last-of-type{ /* 高亮最后停止信息 */
	background-color: #ede0d3;
	text-align: center;
}
footer{
	width: 100%;
	position: fixed;
	bottom: 1vh;
	text-align: center;
}
</style>
	</head>
	<body>
		<nav>
			<label for="expression_page">化学方程式</label>
			<label for="mass_page">相对质量计算</label>
			<label for="about_page">关于</label>
		</nav>
		<input id="expression_page" name="nav" type="radio" checked />
		<div>
			<h1>化学方程式</h1>
			<p><label for="expression">请输入化学方程式：</label></p>
			<input id="expression" value="KClO3--KCl+O2" />
			<button>配平</button>
			<hr/>
			<ul><h3>结果</h3></ul>
			<hr/>
			<div>
				<h2>使用规范与注意事项</h2>
				<ol>
					<li>输入时，反应短线应该写作两个横线（“--”）</li>
					<li>输入时，不应输入反应条件与上下箭头“↑”“↓”；<b>但作答时必须写上！</b></li>
					<li>输入时，原子下标应该<b>输入普通数字，不应使用下标</b>。如：“H₂O”写作“H2O”</li>
					<li>输入时，<b>原子团</b>必须用乘法分配律分配，不允许输入括号（其实是懒得添加支持）。如：“Ca(OH)2”必须写作“CaO2H2”</li>
				</ol>
			</div>
		</div>
		<input id="mass_page" name="nav" type="radio" />
		<div>
			<h1>相对质量计算</h1>
			<p><label for="formula">请输入化学式：</label></p>
			<input id="formula" value="2CO2" /><br/>
			<button disabled>计算相对质量（未开发完成）</button>
			<hr/>
			<h3>结果</h3>
			<div></div>
			<hr/>
			<div>
				<h2>使用规范与注意事项</h2>
				<ol>
					<li>输入时，原子下标应该<b>输入普通数字，不应使用下标</b>。如：“H₂O”写作“H2O”</li>
					<li>输入时，<b>原子团</b>必须用乘法分配律分配，不允许输入括号（其实是懒得添加支持）。如：“Ca(OH)2”必须写作“CaO2H2”</li>
					<li>输入时，<b>离子</b>不应输入电性。如：“Na⁺”必须写作“Na”</li>
					<li>
						<h3>一些支持的元素</h3>
						<table border=2>
							<tr><th>原子序数</th><th>名称</th><th>相对质量</th></tr>
						</table>
					</li>
				</ol>
			</div>
		</div>
		<input id="about_page" name="nav" type="radio" />
		<div>
			<h1>关于</h1>
			<p>作者：WZH</p>
			<p>QQ：1826632591</p>
			<p>有改进意见等欢迎加QQ：<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1826632591&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1826632591:51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a></p>
			<p>邮箱：<a href="mailto:1826632591@qq.com?subject=来自《化学方程式》程序">1826632591@qq.com</a></p>
			<details>
				<summary>同开发者的其他程序</summary>
				<ul>
					<li>
						<details>
							<summary>我的世界（仿）</summary>
							<ul>
								<li><a href="https://github.com/wzh656/MinecraftWeb/releases/download/v2.0.0-alpha/Minecraft.apk">手机APK版</a></li>
								<li><a href="https://wzh656.github.io/MinecraftWeb/home.html">网页版（网速慢者无法打开）</a></li>
							</ul>
						</details>
					</li>
					<li>
						<details>
							<summary>五子棋</summary>
							<ul>
								<li><a href="https://wzh656.github.io/gobang/">网页版</a></li>
							</ul>
						</details>
					</li>
				</ul>
			</details>
			<footer>Copyright © 2020 by WZH 保留一切权利</footer>
		</div>
<script>
$(function(){
	/* 配平化学方程式 */
	let expression_event = ()=>{
		$("#expression ~ ul")[0].innerHTML = "<h3>结果（线程执行中）：</h3>";
		let worker = new Worker("./work.js");
		worker.onmessage = function(e){
			console.info(e.data);
			if (e.data === null){
				worker.terminate();
				$("#expression ~ ul")[0].innerHTML += `<li class="msg finished">线程执行完成</li>`;
				$("#expression ~ ul > h3").html("结果：");
				$("#expression ~ button")
					.css("background-color", "#fffae8")
					.html("配平")
					[0].onclick = expression_event;
			}else{
				$("#expression ~ ul")[0].innerHTML += `<li>${e.data}</li>`;
			}
		}
		worker.postMessage({type: "expression", value: $("#expression").val()});
		$("#expression ~ button")
			.css("background-color", "#edd3e0")
			.html("停止")
			[0].onclick = ()=>{
				worker.terminate();
				$("#expression ~ ul")[0].innerHTML += `<li class="msg stopped">线程已停止</li>`;
				$("#expression ~ button")
					.css("background-color", "#fffae8")
					.html("配平")
					[0].onclick = expression_event;
			};
		console.log(worker)
	};
	$("#expression ~ button")[0].onclick = expression_event;
	
	/* 相对质量计算 */
	const ATOMS = [
		{name: "H", mass: 1},
		{name: "He", mass: 4},
		{name: "Li", mass: 7},
		{name: "Be", mass: 9},
		{name: "B", mass: 11},
		{name: "C", mass: 12},
		{name: "N", mass: 14},
		{name: "O", mass: 16},
		{name: "F", mass: 19},
		{name: "Ne", mass: 20},
		{name: "Na", mass: 23},
		{name: "Mg", mass: 24},
		{name: "Al", mass: 27},
		{name: "Si", mass: 28},
		{name: "P", mass: 31},
		{name: "S", mass: 32},
		{name: "Cl", mass: 35},
		{name: "Ar", mass: 40},
		{name: "K", mass: 39},
		{name: "Ca", mass: 40}
	];
	for (let i in ATOMS){
		$("#formula ~ div > ol > li > table").append(
			$("<tr></tr>")
				.append( $(`<td>${+i+1}</td>`) )
				.append( $(`<td>${ATOMS[i].name}</td>`) )
				.append( $(`<td>${ATOMS[i].mass}</td>`) )
		);
	}
	$("#formula ~ button").click(function(){
		
	});
});
</script>
	</body>
</html>
