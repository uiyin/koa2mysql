const user = require('../../model/user/user.js') // 加载底层模块
const addtoken = require('../../token/addtoken.js') // 加载添加token模块
const checkdata = require('./checkuser.js') // 加载验证模块
const jiami = require('../../token/checkjiami.js') // 加载加密模块
const jiemi = require('../../token/checkjiemi.js') // 加载解密模块
// 加载图片验证码模块
var svgCaptcha = require('svg-captcha')
//加载usermessage
const usermessage = require('./usermessage.js') // 加载用户信息
const weburl = 'https://koa2one.uiyin.com' // 为了应对头像
const userdo = {
     //查验用户名是否被注册
     async checkusername(ctx){
     let value = ctx.request.body
		let result = await user.chachong('name', value.result)
		ctx.body = {
			code: 200,
			total: result[0].total_count
		}
     },
    //调用此接口为了验证验证码是否正确
    async checkma(ctx){
    let value = ctx.request.body;  
    let cookie_content = ctx.cookies.get('YJ') // 取出来cookie
		if (!cookie_content) {
			ctx.body = {
				code: 402,
				message: '请携带withCredentials'
			}
			return
		}
		let cookie_result = jiemi(cookie_content)
		let real = {
			checkpic: value.result
		}
		let result_session = checkdata.checkpic(real, cookie_result) //验证session
        if(result_session){
        ctx.body = {
				code: 200,
				message: '验证码正确'
			}
        
        }else{
        	ctx.body = {
				code: 402,
				message: '验证码不对'
			}
        
        }
    
    },
	//验证码 cookie思路 把验证码存到cookie里面。这样在取出来比较看看是否一样
	async cookieuser(ctx) {
		var captcha = svgCaptcha.create({
			//这种生成的是随机数验证码
			size: 4, //验证码长度
			fontSize: 50, //字体大小
			width: 100,
			height: 40,
			background: '#82A5FF',
			noise: 2 //噪声线条数
		})
		//获取到实际的字符
		let value = captcha.text
		let result = value.toLowerCase()
		let result2 = jiami(result)
		//存到cookie思路 把验证码存到cookie里面。这样在取出来比较看看是否一样
		ctx.cookies.set('YJ', result2, {
			domain: 'koa2one.uiyin.com', // 写cookie所在的域名
			path: '/', // 写cookie所在的路径
			maxAge: 60 * 1000 * 5, // cookie有效时长5分钟
			expires: '', // cookie失效时间不设置表示关闭页面就失效
			httpOnly: false, // 是否只用于http请求中获取
			overwrite: false // 是否允许重写
		})
		ctx.response.type = 'image/svg+xml'
		ctx.body = captcha.data
	},
	//添加用户
	async adduser(ctx) {
		let value = ctx.request.body
		let cookie_content = ctx.cookies.get('YJ') // 取出来cookie
		if (!cookie_content) {
			ctx.body = {
				code: 200,
				message: '请携带withCredentials'
			}
			return
		}
		let cookie_result = jiemi(cookie_content) //解密
		//权限
		let level = 1
		if (value.rule == 1) {
			level = 1 // 1表示管理员
		} else {
			level = 2 // 2表示模块管理员
		}

		let time = new Date()
		let timesite = time.getTime() //获取到时间戳
		let real = {
			checkpic: value.checkpic,
			email: value.email,
			password: value.password,
			name: value.name,
			nick: value.nick,
			detail_info: value.detail_info || '这家伙很懒，什么也没有留下',
			create_time: timesite,
			avaster: value.avaster || weburl + '/touxiang.png',
			level
		}
		// 验证
		let result_session = checkdata.checkpic(real, cookie_result) //验证session
		let result_checkemail = checkdata.checkemail(real) // 验证email
		let result_checkname = checkdata.checkname(real) // 验证名称
		let result_checkpassword = checkdata.checkpassword(real) // 验证密码
		let result_checknick = checkdata.checknick(real) // 验证昵称
		let result_checkdetail = checkdata.checkdetail(real) // 验证详细信息
		if (!result_session) {
			ctx.body = {
				code: 402,
				message: usermessage.FAIL_USER_CHECKPIC
			}
		}
		if (!result_checkemail) {
			ctx.body = {
				code: 402,
				message: usermessage.ERROR_EMAIL
			}
		}
		if (!result_checkname) {
			ctx.body = {
				code: 402,
				message: usermessage.ERROR_USER_NAME
			}
		}
		if (!result_checkpassword) {
			ctx.body = {
				code: 402,
				message: usermessage.ERROR_PASSWORD
			}
		}
		if (!result_checknick) {
			ctx.body = {
				code: 402,
				message: usermessage.FAIL_USER_NICK_NAME
			}
		}
		if (!result_checkdetail) {
			ctx.body = {
				code: 402,
				message: usermessage.FAIL_USER_DETAIL
			}
		}
		if (
			result_session &&
      result_checkemail &&
      result_checkname &&
      result_checkpassword &&
      result_checknick &&
      result_checkdetail
		) {
           let result = await user.chachong('name', value.name);
           let name_number = result[0].total_count;
          if(name_number)
          {
            ctx.body = {
              code:200,
              success:false,
              message:"用户名不能重复"
            }  
          }else{
            let realtrue = {
				email: value.email,
				password: jiami(value.password),
				name: value.name,
				nick: value.nick,
				detail_info: value.detail_info || '这家伙很懒，什么也没有留下',
				create_time: timesite,
				avaster: value.avaster || weburl + '/touxiang.png',
				level
			}
			let result = await user.create(realtrue)
			if (result.affectedRows >= 1) {
				let tk = addtoken({
					name: realtrue.name
				})
				let result = {
					success: true,
					message: '成功',
					data: null,
					token: 'Bearer ' + tk,
                    level:realtrue.level,
					nick:realtrue.nick
				}
				ctx.body = result
			} else {
				ctx.body = '对不起插入失败'
			}
          } 
			
		}
	},
	// 查找用户的所有信息并且分页
	async selectuser(ctx) {
		let value = ctx.request.body //获取到参数
		let pagesize = value.pagesize || 20 // 如果有就是它没有就是20
		let start = (value.page - 1) * pagesize //第一页数据开始
		let end = parseInt(pagesize) //结尾
		let real = {
			start,
			end
		}
		let result = await user.selectvalue(real)
		let count = await user.selectcount()
		ctx.body = {
			total: count[0].total_count - 1, // 超级管理员不出现
			code: 200,
			result
		}
	},
	//通过id查找用户
	async selectsinger(ctx) {
		let value = ctx.request.body
		let id = value.id
		let result = await user.selectOne(id)
		ctx.body = {
			code: 200,
			result
		}
	},
	// 通过用户名查找用户
	async selectusername(ctx) {
		let value = ctx.request.body
		let name = value.name
		let result = await user.selectName(name)
		ctx.body = {
			code: 200,
			result
		}
	},
	// 通过日期查询所有用户
	async selectDate(ctx) {
		let value = ctx.request.body
		let starttime = value.start
		let endtime = value.end
		let pagesize = value.pagesize || 20 // 如果有就是它没有就是20
		let start = (value.page - 1) * pagesize //第一页数据开始
		let end = parseInt(pagesize) //limit 10,20表示从10条以后取20条
		let count = await user.selectcount()
		console.log(start)
		console.log(end)
		let values = `'${starttime}' and '${endtime}'`
		let result = await user.selectDate('create_time', values, start, end)
		ctx.body = {
			total: count[0].total_count - 1, // 超级管理员不出现
			code: 200,
			result
		}
	},
	//排序开始
	async paixu(ctx) {
		let value = ctx.request.query
		let pagesize = value.pagesize || 20 // 如果有就是它没有就是20
		let start = (value.page - 1) * pagesize //第一页数据开始
		let end = parseInt(pagesize) //结尾
		let order = value.order //排序法则
		let result = []
		let count = await user.selectcount()
		if (order == 1) {
			result = await user.selectasc(value.keys, start, end)
		} else {
			result = await user.selectdesc(value.keys, start, end)
		}
		ctx.body = {
			code: 200,
			result,
			total: count[0].total_count - 1 // 超级管理员不出现
		}
	},
	//删除开始
	async delete(ctx) {
		let value = ctx.request.body
		let result = await user.deleteDataById(value.id)
		if (result.affectedRows == 1) {
			ctx.body = {
				code: 200,
				message: '删除成功'
			}
		}
	},
	//查邮箱重复没有
	async chachongemail(ctx) {
		let value = ctx.request.body
		let result = await user.chachong('email', value.result)
		ctx.body = {
			code: 200,
			total: result[0].total_count
		}
	},
	//查昵称重复没有
	async chachongnick(ctx) {
		let value = ctx.request.body
		let result = await user.chachong('nick', value.result)
		ctx.body = {
			code: 200,
			total: result[0].total_count
		}
	},
	//登陆开始
	async login(ctx) {
		let value = ctx.request.body
		let password = value.password
		let jiami_result = jiami(password) // 加密密码
		let cookie_content = ctx.cookies.get('YJ') // 取出来cookie
		if (!cookie_content) {
			ctx.body = {
				code: 402,
				message: '请携带withCredentials'
			}
			return
		}
		let cookie_result = jiemi(cookie_content)
		let real = {
			checkpic: value.checkpic
		}
		let result_session = checkdata.checkpic(real, cookie_result) //验证session
		if (result_session) {
			let result = await user.login(value.name, jiami_result)
			if (result.length > 0) {
				let tk = addtoken({
					name: value.name
				})
				ctx.body = {
					code: 200,
					result,
					token: 'Bearer ' + tk
				}
			} else {
				ctx.body = {
					code: 200,
					message: '用户名或者密码不对'
				}
			}

		} else {
			ctx.body = {
				code: 402,
				message: '验证码不对'
			}
		}
	},
	//查询用户级别
	async userlevel(ctx) {
		let value = ctx.request.body
		let result2 = await user.userlevel(value.level)
        let str = result2[0].content;
        let arr = str.split(",");
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let id = arr[i].substring(arr[i].length - 1, arr[i].length)
    let name = arr[i].substring(0, arr[i].length - 1)
    console.log(id)
    let obj = {
      id,
      name
    }
    result.push(obj)
  }
		ctx.body = {
			code: 200,
			result
		}
	},
	// 查询父元素下面的子菜单
	async userson(ctx) {
		let value = ctx.request.body
		let result = await user.userson(value.level)
		ctx.body = {
			code: 200,
			result
		}
	}
}

module.exports = userdo
