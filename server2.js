var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})

///////////// WEB ROUTES

// Add hook to make it easier to get all visited URLS.
app.use(function(req, res, next) 
{
	console.log(req.method, req.url);

	// ... INSERT HERE.
	

	next(); // Passing the request to the next handler in the stack.
});


app.get('/', function(req, res) {
  res.send('hello world in Port 3002')
})


app.get('/meow', function(req, res) {
	{
		client.lrange("myimg",0,1,function(err,items){
			var imagedata=items[0]
			res.send("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
		})
	}
})
// HTTP SERVER
var server = app.listen(3002, function () {

  var host = server.address().address
  var port = server.address().port
	client.lpush("sitesList",3002)
  console.log('Example app listening at http://%s:%s', host, port)
})

