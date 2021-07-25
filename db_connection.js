const mysql = require('mysql');
const http = require('http');
const url = require('url');

http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);

    const con = mysql.createConnection({
      host: '217.23.6.9',
      port: '3306',
      user: '********', //<--- login in email attachment
      password: '*********', //<--- password in email attachment
      database: 'user2617_shopBD'
    });
    
    let urlRequest = url.parse(request.url, true);
    if (urlRequest.path == '/vaccinesDB') {
      con.connect(function(err) {
        if (err) throw err;
        con.query('SELECT * FROM vaccineOrders', function (err, value, fields) {
          if (err) throw err;
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify(value));
          response.end();
          con.end(function(err) {
            if (err) {
              return console.log('error:' + err.message);
            }
            console.log('Close the database connection.');
          });
        });
      });
    } else if (urlRequest.path.includes('order')) {
      const id = urlRequest.query.id;
      con.connect(function(err) {
        if (err) throw err;
        con.query('SELECT * FROM vaccineOrders WHERE id = ' + mysql.escape(id), function (err, value, fields) {
          if (err) throw err;
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify(value));
          response.end();
          con.end(function(err) {
            if (err) {
              return console.log('error:' + err.message);
            }
            console.log('Close the database connection.');
          });
        });
      });
    } else if (urlRequest.path == '/vaccinations') {
      con.connect(function(err) {
        if (err) throw err;
        con.query('SELECT * FROM vaccinations', function (err, value, fields) {
          if (err) throw err;
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify(value));
          response.end();
          con.end(function(err) {
            if (err) {
              return console.log('error:' + err.message);
            }
            console.log('Close the database connection.');
          });
        });
      })
    };
}).listen(3000);