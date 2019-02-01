const sqlAll = require('../../mysql/mysql.js')
const user = {

	/**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
	async create(value) {
		let sql = `email='${value.email}',
    password='${value.password}',
    name='${value.name}',
    nick='${value.nick}',
    detail_info='${value.detail_info}',
    create_time='${value.create_time}',
    avaster='${value.avaster}',
    level='${value.level}'
    `
		let result = await sqlAll.insertData('user', sql)
		return result
	},
	/** 
   * 查询用户所有信息并且分页
   * @param {object} start 起点 end 终点
   */
	async selectvalue(value) {
		let result = await sqlAll.findDataByPage('user', value)
		return result
	},
	/**
   * 通过ID找到用户所有的信息
   * @param  id 字符串
   */
	async selectOne(id) {
		let result = await sqlAll.findDataById('user', id)
		return result
	},
	/**
   * 通过姓名查找用户所有的信息
   * @param  name 字符串
   */
	async selectName(name) {
		let result = await sqlAll.findDataByName('user', name)
		return result
	},
	/**
   * 
   * 通过日期查找所有用户信息
   * @param keys 字段名 start 起点 end 终点
   */
	async selectDate(keys, values, start, end) {
		let result = await sqlAll.select('user', keys, values, start, end)
		return result
	},
	/**
   * 正序
   * @keys 字段名 @start 开始 @end 结束
   */
	async selectasc(keys, start, end) {
		let result = await sqlAll.selectasc('user', keys, start, end)
		return result
	},
	/**
   * 降序排列
   */
	async selectdesc(keys, start, end) {
		let result = await sqlAll.selectdesc('user', keys, start, end)
		return result
	},
	/**
   * 查询总数
   */
	async selectcount() {
		let result = await sqlAll.count('user')
		return result
	},
	/**
   *  删除指定ID
   */
	async deleteDataById(id) {
		let result = await sqlAll.deleteDataById('user', id)
		return result
	},
	/**
   * 查重开始
   */
	async chachong(keys, value) {
		let result = await sqlAll.chachong('user', keys, value)
		return result
	},
	/**
   * 登陆
   * @params name用户名pasword 密码
   */
	async login(name, password) {
		let result = await sqlAll.login('user', name, password)
		return result
	},
	/**
   * 依据level查询菜单
   */
	async userlevel(value) {
		let result = await sqlAll.userlevel('rules', value)
		return result
	},
	/**
   * 查询父元素下面的子元素
   */
	async userson(value) {
		let result = await sqlAll.userson('menu', value)
		return result
	}
}
module.exports = user