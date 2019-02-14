let pool = require('./mysqlconfig.js')
let query = function (sql, values) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, connection) {
			if (err) {
				reject(err)
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						reject(err)
					} else {
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}
//通过名称查找
let findDataByName = function (table, name) {
	let _sql = `SELECT * FROM ${table} WHERE name LIKE '${name}' `
	return query(_sql)
}
//通过ID查找
let findDataById = function (table, id) {
	let _sql = `SELECT * FROM ${table} WHERE id = ${id} `
	return query(_sql)
}

//money写的分页

let findDataByPage2 = function (table, value) {
	let _sql = `SELECT * FROM ${table} ORDER BY id desc LIMIT ${value.start} , ${value.end}`
	console.log(_sql)
	return query(_sql)
}
//写的分页

let findDataByPage = function (table, value) {
	let _sql = `SELECT * FROM ${table} WHERE id > 1 ORDER BY id desc LIMIT ${value.start} , ${value.end}`
	console.log(_sql)
	return query(_sql)
}

//增加
let insertData = function (table, values) {
	let _sql = `INSERT INTO ${table} SET ${values}`

	return query(_sql)
}

//修改
let updateData = function (table, values, id) {
	let _sql = `UPDATE ${table} SET ${values} WHERE id = ${id}`

	return query(_sql)
}

// 删除
let deleteDataById = function (table, id) {
	let _sql = `DELETE FROM ${table} WHERE id = ${id}`
	return query(_sql)
}

//按时间查询所有
let select = function (table, keys, values, start, end) {
	let _sql = `SELECT * FROM ${table} WHERE ${keys} between ${values} and id > 1 ORDER BY id desc LIMIT ${start} , ${end}`
	return query(_sql)
}
//按照时间查询总数
let count2 = function (table, keys, values,start,end) {
	let _sql = `SELECT COUNT(*) AS total_count FROM ${table} WHERE ${keys} between ${values} ORDER BY id desc LIMIT ${start} , ${end}`
	return query(_sql, [table])
}
//查询总数
let count = function (table) {
	let _sql = `SELECT COUNT(*) AS total_count FROM ${table} `
	return query(_sql, [table])
}
//查询正序
let selectasc = function (table, keys, start, end) {
	let _sql = `SELECT * FROM ${table} WHERE id > 1 ORDER BY ${keys} ASC  LIMIT ${start} , ${end}`
	return query(_sql)
}
//查询降序
let selectdesc = function (table, keys, start, end) {
	let _sql = `SELECT * FROM ${table} WHERE id > 1 ORDER BY ${keys} DESC  LIMIT ${start} , ${end}`
	return query(_sql)
}
//查询字段有没有被注册
let chachong = function (table, keys, values) {
	let _sql = `SELECT COUNT(*) AS total_count FROM ${table} WHERE ${keys}='${values}'`
	return query(_sql)
}
//登陆
let login = function (table, name, password) {
	let _sql = `SELECT nick,level FROM ${table} WHERE name ='${name}' and password = '${password}'` // 返回的就是nick
	return query(_sql)
}
//查询用户级别对应的菜单
let userlevel = function (table, level) {
	let _sql = `SELECT content FROM ${table} WHERE rule ='${level}' ` // 返回的就是菜单
	return query(_sql)
}
let userson = function (table, level) {
	let _sql = `SELECT name FROM ${table} WHERE pid ='${level}' ` // 返回的就是菜单
	return query(_sql)
}
module.exports = {
    findDataByPage2,
	query,
	userson,
	userlevel,
	login,
	chachong,
	selectasc,
	selectdesc,
	findDataByName,
	findDataById,
	findDataByPage,
	deleteDataById,
	insertData,
	updateData,
	select,
	count,
  count2
}