var express = require('express');
var moment = require('moment');
var app = express();

app.get('/', function(req, res){
    res.send("Psst... Put in a date/timestamp...");
});

app.get('/:timestamp', function(req, res){
   var input = req.params.timestamp;
   var json = {
       "unix": null,
       "natural": null
   };
   
   
   // Check if input is a unix timestamp
   if (moment.unix(input).isValid()){
       
       json.unix = input;
       json.natural = moment(input).format('MMMM D, YYYY');
       app.send(json);
   }
   
   // Check if input is a normal date
   else if (moment(input).isValid()){
       var unixTime = (new Date(input).getTime())/1000;
       json.unix = unixTime;
       json.natural = input;
       app.send(json);
   }
   else {
       app.send(json);
   }
});


app.listen(process.env.PORT || 8080);