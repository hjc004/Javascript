var express = require('express');
var app = express();
app.use('/public', express.static('public'));


var mysql  = require('mysql');  
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '852008',       
  port: '3306',                   
  database: 'MyDB' 
}); 



app.get('/news', function (req, res) {
   res.sendFile( __dirname + "/" + "shiyan7-2.html" );
});

app.get('/detail', function (req, res) {
  res.sendFile( __dirname + "/" + "shiyan7-3.html" );
});



connection.connect();

app.get('/getNews', function (req, res) {
   // 输出 JSON 格式
   var sql = 'SELECT * FROM t_news';
   connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
   console.log(JSON.stringify(result));
   res.end(JSON.stringify(result));
});
});

app.get('/getDetail', function (req, res) {
  // 输出 JSON 格式
  var sql = 'SELECT * FROM t_news where NewsId=' + req.query.newsId;
  connection.query(sql,function (err, result) {
   if(err){
     console.log('[SELECT ERROR] - ',err.message);
     return;
   }
  console.log(JSON.stringify(result));
  res.end(JSON.stringify(result));
});
});
 
var server = app.listen(8087, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
})