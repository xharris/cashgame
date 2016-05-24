var nwSQL = require('mysql');
var nwGUI = require('nw.gui');
var nwMSG = require('messenger');
var nwIP = require('ip');

var client, server;

var win = nwGUI.Window.get();

win.showDevTools();

var isMaximized = false;

function winResize(){
	if(isMaximized){
    	isMaximized = false;
  		win.unmaximize();
	}else{
    	isMaximized = true;
  		win.maximize();
	}
}

function winClose(){
	DB.end(function(err){
    	win.close();
	})
}

function showProgress(){
	$("body > .progress").addClass("active");
}

function hideProgress(){
	$("body > .progress").removeClass("active");
}

function showToast(msg, duration) {
	Materialize.toast(msg, duration);
}

$(function(){
	DB.connect();

	/*
	client = nwMSG.createSpeaker('8000');
	server = nwMSG.createListener('8000');

	server.on('give it to me', function(message, data){
	  message.reply(data)
	});

	setInterval(function(){
	  client.request('give it to me', {user_id:'world'}, function(data){
	    console.log(data);
	  });
	}, 1000);
	*/
})

function btn_login() {
	loginUser($("#login_email").val(), $("#login_password").val())
}

// err(0), login(1), register(2), incorrect creds(3)
function loginUser(username, password) {
	User.login(username, password, function(status){
		// error
		if (status == 0) {
			showToast("Connection problem!", 4000);
		}
		// login
		else if (status == 1) {
			$(".window.login").addClass("invisible");
		}
		// bad creds
		else if (status == 3) {
			showToast("Wrong password/username!", 4000);
		}
	});
}
