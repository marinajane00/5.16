var connection = mysql.createConnection({
  host     : '192.168.3.110',//远程MySQL数据库的ip地址
  user     : 'me',
  password : 'secret',
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();