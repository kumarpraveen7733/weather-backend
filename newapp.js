"use strict"

var express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const { MemoryCookieStore } = require('tough-cookie');
// create an instance of express to serve our end points
var app = express();

app.listen(3000)
console.log('Node.js server is running on port 3000...')
const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) 
  {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

app.get('/v1/hello', greeting)
app.get('/v1/weather',  get_weather)
app.post('/v1/auth',  authentication)

function get_weather(request, response) 
{
  var authHeaderToken = request.headers.authorization;
  if (!authHeaderToken)
  {
    response.send("You need to request with authorization token")
  }
  else if (authHeaderToken.replace('Bearer ', '') == "eyJhbCI6IkhTMjU2IiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQeyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.BsJ0pCEf_hKnDrPo95wDdoNYhDqK0fV4t2muCqMTDUc")
  {
    response.json({"coord":{"lon":-123.262,"lat":44.5646},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":282,"feels_like":282,"temp_min":280.02,"temp_max":284.57,"pressure":1027,"humidity":77},"visibility":10000,"wind":{"speed":0,"deg":0},"clouds":{"all":100},"dt":1642198763,"sys":{"type":2,"id":2040223,"country":"US","sunrise":1642175199,"sunset":1642208235},"timezone":-28800,"id":5720727,"name":"Corvallis","cod":200})
  }
  else
 {
    response.send("Authorization failed.")
  }
}

function greeting(request, response) 
{
  var authHeaderToken = request.headers.authorization;
  if (!authHeaderToken) 
  {
    response.send("You need to request with authorization token")
  }
  else if (authHeaderToken.replace('Bearer ', '') == "eyJhbCI6IkhTMjU2IiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQeyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.BsJ0pCEf_hKnDrPo95wDdoNYhDqK0fV4t2muCqMTDUc")
  {
  response.send("Hello/n")
  }
  else {
    response.send("Authorization failed.")
  }
}

function authentication(request, response) 
{
  var username = request.body.username;
  var password = request.body.password;
  var jwt = "eyJhbCI6IkhTMjU2IiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQeyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.BsJ0pCEf_hKnDrPo95wDdoNYhDqK0fV4t2muCqMTDUc"
  const currentTime = new Date();
  if (username=='Praveen' && password=='123')
  {
      response.json
      ({
        "Access token":  jwt,
        "Expires": currentTime
        })
  }
  else 
  {
        response.sendStatus(401)
        // response.json({"unauthorized":401})
  }
}