// 加载路由模块
const router = require('koa-router')()
//
//加载各自独立模块
const test = require('./test/test.js')
const user = require('./user/user.js')
const checkpic = require('./checkpic/checkpic.js')
const money = require('./money/money.js')
const koaJwt = require('koa-jwt') //路由权限控制
const Secret = require('../token/Secret.js') // 加载secret
const jwtSecret = Secret
router.use(koaJwt({
	secret: jwtSecret
}).unless({
	path: [/\/user\/login/, /\/user\/signup/, /\/checkpic/,/\/user\/checknick/,/\/user\/checkemail/,/\/user\/checkma/,/\/user\/checkusername/] //排除路径
}))
//使用这些独立的模块
router.use('/test', test.routes(), test.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/money', money.routes(), money.allowedMethods())
router.use('/checkpic', checkpic.routes(), checkpic.allowedMethods())
module.exports = router