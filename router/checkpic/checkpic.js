// 加载路由开始,注意koarouter返回的是一个函数
const router = require('koa-router')()
const userdo = require('../../control/user/user.js')
router.get('/', userdo.cookieuser)
module.exports = router