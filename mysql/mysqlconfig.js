const mysql = require('mysql')
let pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'xxxxxx',
  password: 'xxxxxxx',
  database: 'xxxxxxxx'
})
module.exports = pool