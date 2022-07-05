if (typeof io == "undefined")
	throw "io is undefined";
const SOCKET = {
	socket: null,
	events: { //事件
		connecting: [],
		connect: [],
		connect_failed: [],
		disconnect: [],
		reconnecting: [],
		reconnect: [],
		reconnect_failed: [],
		error: []
	},
	
	//连接
	connect(url){
		this.socket = io(url);
		this.socket.on("connecting", (data)=>{
			console.log("连接服务器中……", data)
			this.events.connecting.forEach(func => func(data));
		});
		this.socket.on("connect", (data)=>{
			console.log("服务器连接成功", data)
			this.events.connect.forEach(func => func(data));
		});
		this.socket.on("connect_failed", (data)=>{
			console.log("服务器连接失败", data)
			this.events.connect_failed.forEach(func => func(data));
		});
		this.socket.on("disconnect", (data)=>{
			console.log("与服务器连接断开", data)
			this.events.disconnect.forEach(func => func(data));
		});
		this.socket.on("reconnecting", (data)=>{
			console.log("服务器重连中……", data)
			this.events.reconnecting.forEach(func => func(data));
		});
		this.socket.on("reconnect", (data)=>{
			console.log("服务器重连成功", data)
			this.events.reconnect.forEach(func => func(data));
		});
		this.socket.on("reconnect_failed", (data)=>{
			console.log("服务器重连失败", data)
			this.events.reconnect_failed.forEach(func => func(data));
		});
		this.socket.on("error", (data)=>{
			console.log("服务器连接错误", data)
			this.events.error.forEach(func => func(data));
		});
		return this;
	},
	
	//发送消息
	send(name, ...data){
		console.log("↑", name, ...data)
		return this.socket.emit(name, ...data);
	},
	
	//断开
	disconnect(){
		this.socket.disconnect();
		return this;
	},
	
	//监听事件
	on(name, func){
		if (this.events[name]){ //已存在
			this.events[name].push(func);
		}else{ //不存在
			this.events[name] = [func];
			this.socket.on(name, (...data)=>{
				this.events[name].forEach(func => func(...data));
			});
		}
		return this;
	}
};
