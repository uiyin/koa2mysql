const mysql = require('mysql')
let pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'koatest2',
  password: 'xxxxxxx',
  database: 'xxxxxxx'
})
module.exports = pool