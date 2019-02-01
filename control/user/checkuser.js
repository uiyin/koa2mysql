const checkdata = {
	// 检查图片验证码
	checkpic(value, cookie_result) {
		let result = cookie_result.toLowerCase()
		let result1 = value.checkpic.toLowerCase()
		if (result1 == result) {
			return true
		} else {
			return false
		}
	},
	//检查邮箱
	checkemail(value) {
		var re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
		if (re.test(value.email)) {
			return true
		} else {
			return false
		}
	},
	//检查用户名
	checkname(value) {
		var re = /^[a-zA-Z0-9_-]{6,16}$/
		if (re.test(value.name)) {
			return true
		} else {
			return false
		}
	},
	//检查密码
	checkpassword(value) {
		var re = /^(\w){6,20}$/
		if (re.test(value.password)) {
			return true
		} else {
			return false
		}
	},
	//验证昵称
	checknick(value) {
		let re = /^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/
		if (re.test(value.nick)) {
			return true
		} else {
			return false
		}
	},
	//验证个人简介
	checkdetail(value) {
		let re = /^[A-Za-z0-9\u4e00-\u9fa5]{1,200}$/
		if (re.test(value.detail_info)) {
			return true
		} else {
			return false
		}
	}

}



module.exports = checkdata