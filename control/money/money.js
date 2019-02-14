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
//查询日期符合数据
let selectdate = async function(ctx){
let value = ctx.request.body
		let starttime = value.start
		let endtime = value.end
		let pagesize = value.pagesize || 20 // 如果有就是它没有就是20
		let start = (value.page - 1) * pagesize //第一页数据开始
		let end = parseInt(pagesize) //limit 10,20表示从10条以后取20条
        console.log(start)
		console.log(end)
		let values = `'${starttime}' and '${endtime}'`
		let count = await money.selectcount2('create_time', values, start, end)
		let result = await money.selectDate('create_time', values, start, end)
		ctx.body = {
			total: count[0].total_count, 
			code: 200,
			result
		}

}
module.exports = {
	Insert,
	deleteOne,
	updateOne,
	selectonemoney,
	selectmoney,
    selectdate
}