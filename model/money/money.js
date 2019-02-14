const sqlAll = require('../../mysql/mysql.js')
const money = {
	/**
   * 增加用户信息
   * @param {object}
   */
	async Insert(value) {
		let sql = `create_time='${value.create_time}',
    type='${value.type}',
    income='${value.income}',
    pay='${value.pay}',
    cash='${value.cash}',
    info='${value.info}'
    `
		console.log(sql)
		let result = await sqlAll.insertData('monet', sql)
		return result
	},
	/*依据ID删除指定元素*/
	async deleteOne(value) {
		let result = await sqlAll.deleteDataById('monet', value)
		return result
	},
	/*更新ID数据开始*/
	async updateOne(value) {
		let sql = `type='${value.type}',
    income='${value.income}',
    pay='${value.pay}',
    cash='${value.cash}',
    info='${value.info}'
    `
		console.log(sql)
		let result = await sqlAll.updateData('monet', sql, value.id)
		return result
	},
	/**
   * 查询单个元素内容
   */
	async selectonemoney(value) {
		let result = await sqlAll.findDataById('monet', value)
		return result
	},
  	/**
   * 查询总数2
   */
	async selectcount2(keys, values, start, end) {
		let result = await sqlAll.count2('monet', keys, values, start, end)
		return result
	},
	/**
   * 查询总数
   */
	async selectcount() {
		let result = await sqlAll.count('monet')
		return result
	},
  /**
   * 
   * 通过日期查找所有用户信息
   * @param keys 字段名 start 起点 end 终点
   */
	async selectDate(keys, values, start, end) {
		let result = await sqlAll.select('monet', keys, values, start, end)
		return result
	},
	/*查询所有元素内容*/
	async selectmoney(value) {
		let result = await sqlAll.findDataByPage2('monet', value)
		return result
	},
}
module.exports = money