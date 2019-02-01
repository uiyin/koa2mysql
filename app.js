// 加载koa模块
const Koa = require('koa')
const app = new Koa()

/*---------post文件模块数据开始-----------------*/
// 加载koa-bodyparser
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
// 加载允许跨域模块这个模块加载了就保证允许跨域了
var cors = require('koa2-cors')
// 输出的时候就是json包
var json = require('koa-json')
app.use(json())
app.use(cors({
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'], // 请求成功后，脚本可以在XMLHttpRequest中访问这些头的信息
	maxAge: 100, // 用来指定本次预检请求的有效期，单位为秒
	credentials: true, //表示是否允许发送Cookie
	allowMethods: ['GET', 'POST', 'OPTIONS'], // 设置所允许的HTTP请求方法
	allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'] // 表明服务器支持的所有头信息字段
}))
/*-----------------post文件模块数据结束----------------*/



/*------------------------静态文件模块开始------------------*/

// 加载路径模块
const path = require('path')
// 加载静态文件模块
const staticAll = require('koa-static')
// 静态资源目录对于相对入口文件app.js的路径
const staticPath = './static'

app.use(staticAll(path.join(__dirname, './uploads')))
app.use(staticAll(path.join(__dirname, staticPath)))

/*----------------------------静态文件模块结束----------------------*/




/*---------------------路由模块开始----------------------------*/
// token拦截失效了或者不对，没加直接返回401,然后前端在跳转
app.use(function (ctx, next) {
	return next().catch((err) => {
		if (401 == err.status) {
			ctx.status = 401
			ctx.body = {
				code: 401,
				message: 'token过期了'
			}
		} else {
			throw err
		}
	})
})
//加载路由模块开始
const routers = require('./router/router.js')
app.use(routers.routes()).use(routers.allowedMethods())

/*-------------------------路由模块结束---------------------*/



/*--------------------所有路由找不到的情况下开始----------------*/
// 路由找不到啊的情况,这个卸载路由最后这样不会优先匹配
app.use(async (ctx, next) => {
	if (ctx.request.response.status === 404) {
		let value = '对不起没有这个页面'
		ctx.body = value
		console.log(ctx.request.path + ':' + ctx.request.method)
		await next()
	}
})

app.listen(23000, () => {
	console.log('服务启动了')
})


/*--------------------所有路由找不到的情况下结束-----------*/