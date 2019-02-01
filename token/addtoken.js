const jwt = require('jsonwebtoken')
const Secret = require('./Secret.js')
const jwtSecret = Secret
const tokenExpiresTime = 60 * 60 * 24 * 30 // 这样一个月以后token才消失
module.exports = (userinfo) => { //创建token并导出
	const token = jwt.sign({
		name: userinfo.name // 只能是name这样才不会解析出来
	}, jwtSecret, {
		expiresIn: tokenExpiresTime
	})
	return token
}