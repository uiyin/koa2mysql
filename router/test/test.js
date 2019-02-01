// 加载路由开始,注意koarouter返回的是一个函数
const router = require('koa-router')()
// 加载文件模块
var path = require('path')
const fs = require('fs')
router.get('/', async (ctx, next) => {
	let value = path.resolve(__dirname, '../..') // 获取到根目录路径
	ctx.response.type = 'html'
	ctx.response.body = fs.createReadStream(value + '/pages/index.html')
	//他后面要是有代码的话，他先执行后面的异步操作。等后面的异步操作完事了。他在由后向前推动执行
	await next()
})
module.exports = router