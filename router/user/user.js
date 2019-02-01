// 加载路由开始,注意koarouter返回的是一个函数
const router = require('koa-router')()
const userdo = require('../../control/user/user.js')
//注册接口
//登陆接口
router.post('/login', userdo.login)
router.post('/signup', userdo.adduser)
//查询用户所有信息接口
router.post('/selectuser', userdo.selectuser)
//查询单个用户所有信息
router.post('/selectone', userdo.selectsinger)
//按照名称查询用户所有信息
router.post('/selectusername', userdo.selectusername)
//按照日期查询所有用户信息
router.post('/selectdata', userdo.selectDate)
//按照id排列
router.get('/selectpaixu', userdo.paixu)
//删除指定id
router.post('/deleteuser', userdo.delete)
//查询email注册没有
router.post('/checkemail', userdo.chachongemail)
//查询昵称注册了没有
router.post('/checknick', userdo.chachongnick)
//依据用户级别查询菜单
router.post('/userlevel', userdo.userlevel)
//依据父元素ID来查找子菜单
router.post('/userson', userdo.userson)
//查询验证码是否正确
router.post('/checkma', userdo.checkma)
//查验用户名是否重复
router.post('/checkusername', userdo.checkusername)
module.exports = router