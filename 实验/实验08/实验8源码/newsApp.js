var express = require('express');
var app = express();
var newsdb = require('./news');
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use('/public', express.static('public'));


app.get('/news-index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "news-index.html" );
});


app.get('/getNews', function (req, res) {
   newsdb.showAll(function(err, result){
    res.end(result);
   });
});

app.get('/deleteNews', function (req, res) {
  newsdb.deleteNews(req.query.id, function(err, result){
   res.end(result);
  });
});

app.post('/InsertNews', urlencodedParser, function (req, res) {
  // 输出 JSON 格式
  newsdb.InsertNews(req.body.title, req.body.content, req.body.author, '2019-11-29', function(err, result){
    res.end(result);
});
})

 
var server = app.listen(8088, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
})