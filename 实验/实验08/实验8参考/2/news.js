
var mysql  = require('mysql');  
var dbconfig = require("./database");
//使用连接池
var pool = mysql.createPool(dbconfig.mysql);

exports.showAll = function(callback) {
  pool.getConnection(function(err, connection) {
    //定义查询语句
    var sql = "SELECT * FROM t_news";
    connection.query(sql,function(err,result) {
        result = JSON.stringify(result);
        console.log(result);
        // 释放连接
        callback(err,result);
        connection.release();
        
    })
  });
}

exports.deleteNews = function(id, callback) {
  pool.getConnection(function(err, connection) {
    //定义查询语句
    console.log(id);
    var sql = "delete FROM t_news where NewsId=" + id;
    connection.query(sql,function(err,result) {
        result = JSON.stringify(result);
        console.log(result);
        // 释放连接
        callback(err,result);
        connection.release();
        
    })
  });
}

exports.InsertNews = function(title,content,authur,pubtime,callback) {
  var  addSql = 'INSERT INTO t_news(NewsTitle,NewsContent,NewsAuthor,NewsTime) VALUES(?,?,?,?)';
  var  addSqlParams = [title,content,authur,pubtime]; 
  pool.getConnection(function(err, connection) {
    //定义查询语句
    connection.query(addSql, addSqlParams, function(err,result) {
        //result = JSON.stringify(result);
        console.log(result.insertId);
        // 释放连接
        callback(err, JSON.stringify(result));
        connection.release();
    })
  });
}