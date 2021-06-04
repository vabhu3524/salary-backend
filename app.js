const http = require('http');
var express = require('express');

var app = express();
const fs = require('fs');



app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.get('/', function (req, res) {
    res.send('Hello World!');
  });

app.post('/login', function (req, res) {
 
  console.log(req.body);
  var resObj={status:false,responseString:""};
  if(req.body!=null){
  
    if(req.body.username == "admin" && req.body.password=="pass@123"){
      resObj.status=true;
      resObj.responseString="Login successfull";
      res.send(resObj);
    }else{
      resObj.status=false;
      resObj.responseString="Invalid Login Details";
      res.send(resObj);
    }

  }else{
    res.send(resObj);
  }
});


app.post('/insertdetails', function (req, res) {
 
  console.log(req.body);
  var resObj={status:false,responseString:""};
  if(req.body!=null){
  
    var json = JSON.stringify(req.body);
    fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
      if (err){ 
          console.log(err);
      } else {
        var obj = {
          table: []
       };
        if(data!=null && data!=''){
          obj = JSON.parse(data); //now it an object
          obj.table.push(req.body); //add some data
        }else{
          obj.table.push(req.body);
        }
     
      json = JSON.stringify(obj); //convert it back to json
      fs.writeFile('myjsonfile.json', json, 'utf8', function(err){
        if(err) throw err;
      }); // write it back 
    }});

  }else{
    res.send(resObj);
  }
});



app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});
