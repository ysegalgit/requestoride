"use strict";

var http    = require('http');		//https://www.npmjs.com/package/request
var request = require('request');	//https://github.com/mikeal/request

exports.rejectSelfSignedSSL = true;

exports.postRequest = function(myUrl, requestBody, headers, preserveCookie, onResult){
	var options = {
			url					: myUrl,
			headers				: { 'Content-Type': 'application/json' },
			body				: requestBody,
			followAllRedirects 	: true,
			//jar 				: true	//use cookies in the subsequent requests (if redirected for example)
			jar 				: preserveCookie	//use cookies in the subsequent requests (if redirected for example)
	}

	if(headers){
		//console.log("headers found." + headers);
		options.headers = headers;
		options.headers['Content-Type'] = 'application/json';
	}

	request.post(options, function (error, response, body){

		var j = request.jar();
		var cookie_string = j.getCookieString(myUrl);
		var cookies = j.getCookies(myUrl);
		//console.log(myUrl);
		//console.log("Headers:" + JSON.stringify(response.headers));
		//console.log("Header:" + JSON.stringify(response.headers['set-cookie']));
		//console.log("Cookie:" + cookie_string);

		onResult(error, response, body); //simple wrapper
	});
}

exports.postRequestWithCookie = function(myUrl, requestBody, theCookie, onResult){

	var j = request.jar();
	var cookie = request.cookie(theCookie);
	j.setCookie(cookie, myUrl);

	var requestWithCookie = request.defaults({jar: j});

	var options = {
			url: myUrl,
			body: requestBody,
			headers: { 'Content-Type': 'application/json' },
			rejectUnauthorized : this.rejectSelfSignedSSL
			//jar : j
	};

	requestWithCookie.post(options, function (error, response, body) {
		onResult(error, response, body)	//simple wrapper
	})
}

exports.putRequest = function(myUrl, requestBody, headers, preserveCookie, onResult){
	var options = {
			url					: myUrl,
			headers				: { 'Content-Type': 'application/json' },
			body				: requestBody,
			followAllRedirects 	: true,
			//jar 				: true	//use cookies in the subsequent requests (if redirected for example)
			jar 				: preserveCookie	//use cookies in the subsequent requests (if redirected for example)
	}

	if(headers){
		//console.log("headers found." + headers);
		options.headers = headers;
		options.headers['Content-Type'] = 'application/json';
	}

	//look at http://nodejs.org/api/http.html (search for 'options')

	request.put(options, function (error, response, body){

		var j = request.jar();
		var cookie_string = j.getCookieString(myUrl);
		var cookies = j.getCookies(myUrl);

		onResult(error, response, body); //simple wrapper
	});
}

exports.putRequestWithCookie = function(myUrl, requestBody, theCookie, onResult){

	var j = request.jar();
	var cookie = request.cookie(theCookie);
	j.setCookie(cookie, myUrl);

	var requestWithCookie = request.defaults({jar: j});

	var options = {
			url: myUrl,
			body: requestBody,
			headers: { 'Content-Type': 'application/json' },
			rejectUnauthorized : this.rejectSelfSignedSSL
			//jar : j
	};

	requestWithCookie.put(options, function (error, response, body) {
		onResult(error, response, body)	//simple wrapper
	})
}

exports.getRequest = function(myUrl, headers, preserveCookie, onResult){

	var options = {
			url 				: myUrl,
			headers 			: { 'Content-Type': 'application/json' },
			rejectUnauthorized 	: this.rejectSelfSignedSSL,
			jar 				: preserveCookie	//use cookies in the subsequent requests (if redirected for example)
	}

	if(headers){
		options.headers = headers;
		options.headers['Content-Type'] = 'application/json';
	}

	request(options, function (error, response, body) {
		onResult(error, response, body)	//simple wrapper
	})
}

exports.getRequestWithCookie = function(myUrl, theCookie, onResult){

	var j = request.jar();
	var cookie = request.cookie(theCookie);
	j.setCookie(cookie, myUrl);

	var requestWithCookie = request.defaults({jar: j});

	var options = {
			url: myUrl,
			headers: { 'Content-Type': 'application/json' },
			rejectUnauthorized : this.rejectSelfSignedSSL
			//jar : j
	};

	requestWithCookie.get(options, function (error, response, body) {
		onResult(error, response, body)	//simple wrapper
	})
}

exports.deleteRequest = function(myUrl, headers, preserveCookie, onResult){

	var options = {
			url 				: myUrl,
			headers 			: { 'Content-Type': 'application/json' },
			rejectUnauthorized 	: this.rejectSelfSignedSSL,
			jar 				: preserveCookie	//use cookies in the subsequent requests (if redirected for example)
	}

	if(headers){
		options.headers = headers;
		options.headers['Content-Type'] = 'application/json';
	}

	request.del(options, function (error, response, body){
		onResult(error, response, body)	//simple wrapper
	});
}

exports.deleteRequestWithCookie = function(myUrl, theCookie, onResult){

	var j = request.jar();
	var cookie = request.cookie(theCookie);
	j.setCookie(cookie, myUrl);

	var requestWithCookie = request.defaults({jar: j});


	var options = {
			url: myUrl,
			headers: { 'Content-Type': 'application/json' },
			rejectUnauthorized : this.rejectSelfSignedSSL
			//jar : j
	};

	requestWithCookie.delete(options, function (error, response, body) {
		onResult(error, response, body)	//simple wrapper
	})
}

exports.getId = function(response){
	return (response.statusCode == 201) ?
		response.headers.location.substr(response.headers.location.lastIndexOf('/') + 1) : null;
}

exports.hasHTTPErrors = function(response){
	if(response && typeof response.statusCode == 'number')
		return response.statusCode < 400 ? false : true;
	else
		return true;
}
