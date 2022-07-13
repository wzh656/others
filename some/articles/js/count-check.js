SOCKET.connect("https://wzh.glitch.me/")
	.send("type", "count")
	.send("count_into", {
		name: "学考查分平台-wzh",
		url: location.href,
		intoTime: +new Date(),
		referer: document.referrer,
		ua: navigator.userAgent,
		platform: navigator.platform,
		language: navigator.language
	});
