// 加载路由开始,注意koarouter返回的是一个函数
const router = require('koa-router')()
// 加载控制器模块
const moneydo = require('../../control/money/money.js')
//插入模块开始
router.post('/insertmoney', moneydo.Insert)
//删除模块
router.post('/deletemoney', moneydo.deleteOne)
//更新模块
router.post('/updatemoney', moneydo.updateOne)
//按照ID查询单个元素
router.post('/selectonemoney', moneydo.selectonemoney)
//查询所有数据并且分页
router.post('/selectmoney', moneydo.selectmoney)
module.exports = router