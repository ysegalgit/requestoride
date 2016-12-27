"use strict";

var request = require('request');

module.exports = {
	getRequest	: getRequest,
	postRequest	: postRequest,
	putRequest	: putRequest,
	deleteRequest	: deleteRequest,

		//helpers
	getId			: getId,
	hasHTTPErrors	: hasHTTPErrors
};

var baseRequest = request.defaults( {
	headers				: { 'Content-Type': 'application/json' },
	followAllRedirects 	: true,
	jar 				: true	//use cookies in the subsequent requests (if redirected for example)
});

var postRequests = baseRequest.defaults( {
	method				: 'POST'
} );

var putRequests = baseRequest.defaults( {
	method				: 'PUT',
} );

function getRequest(myUrl, myHeaders, preserveCookie, cookie, onResult){
	var options = {
		url 	: myUrl,
		jar 	: preserveCookie,	//use cookies in the subsequent requests (if redirected for example)
			//headers : myHeaders
	};

	setHeaders(options, myHeaders);
	setCooKie(options, cookie, myUrl);
	return request(options, onResult);	//onResult from type 'function(error, response, body)'
}

function postRequest(myUrl, requestBody, myHeaders, preserveCookie, cookie, onResult){
	var options = {
		url		: myUrl,
		body	: requestBody,
		jar 	: preserveCookie	//use cookies in the subsequent requests (if redirected for example)
	};

	setHeaders(options, myHeaders);
	setCooKie(options, cookie, myUrl);
	return postRequests(options, onResult);	//onResult from type 'function(error, response, body)'
}

function putRequest (myUrl, requestBody, myHeaders, preserveCookie, cookie, onResult){
	var options = {
		url		: myUrl,
		body	: requestBody,
		jar 	: preserveCookie	//use cookies in the subsequent requests (if redirected for example)
	};

	setHeaders(options, myHeaders);
	setCooKie(options, cookie, myUrl);
	return putRequests(options, onResult);	//onResult from type 'function(error, response, body)'
}

function deleteRequest(myUrl, myHeaders, preserveCookie, cookie, onResult){
	var options = {
		url 	: myUrl,
		jar 	: preserveCookie	//use cookies in the subsequent requests (if redirected for example)
	};

	setHeaders(options, myHeaders);
	setCooKie(options, cookie, myUrl);
	return request.del(options, onResult); //onResult from type 'function(error, response, body)'
}

function setHeaders(options, theHeaders){
	if(theHeaders)
		options.headers = theHeaders;
}

function setCooKie(options, theCookie, theUrl){
	if(theCookie){
		var j = request.jar();
		var cookie = request.cookie(theCookie);
		j.setCookie(cookie, theUrl);
		options.jar = j;
	}
}

function getId(response){
	return (response.statusCode == 201) ?
		response.headers.location.substr(response.headers.location.lastIndexOf('/') + 1) : null;
}

function hasHTTPErrors(response){
	if(response && typeof response.statusCode == 'number')
		return response.statusCode < 400 ? false : true;
	else
		return true;
}
