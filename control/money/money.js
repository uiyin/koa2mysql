const money = require('../../model/money/money.js') // 加载底层模块
let Insert = async function (ctx) {
	let value = ctx.request.body
	let result = await money.Insert(value)
	if (result.affectedRows == 1) {
		ctx.body = {
			code: 200,
			message: '插入成功'
		}
	} else {
		ctx.body = {
			code: 402,
			message: '插入失败'
		}
	}

}
let deleteOne = async function (ctx) {
	let value = ctx.request.body
	let result = await money.deleteOne(value.id)
	if (result.affectedRows == 1) {
		ctx.body = {
			code: 200,
			message: '删除成功'
		}
	} else {
		ctx.body = {
			code: 402,
			message: '删除失败'
		}
	}
}
let updateOne = async function (ctx) {
	let value = ctx.request.body
	let result = await money.updateOne(value)
	console.log(result)
	if (result.affectedRows == 1) {
		ctx.body = {
			code: 200,
			message: '更新成功'
		}
	} else {
		ctx.body = {
			code: 402,
			message: '更新失败'
		}
	}
}
//查询单个元素
let selectonemoney = async function (ctx) {
	let value = ctx.request.body
	let result = await money.selectonemoney(value.id)
	ctx.body = {
		code: 200,
		result
	}
}
//查询所有元素
let selectmoney = async function (ctx) {
	let value = ctx.request.body //获取到参数
	let pagesize = value.pagesize || 20 // 如果有就是它没有就是20
	let start = (value.page - 1) * pagesize //第一页数据开始
	let end = parseInt(pagesize) //结尾
	let real = {
		start,
		end
	}
	console.log(real)
	let result = await money.selectmoney(real)
	let count = await money.selectcount()
	ctx.body = {
		code: 200,
		result,
		total: count[0].total_count
	}
}
module.exports = {
	Insert,
	deleteOne,
	updateOne,
	selectonemoney,
	selectmoney
}