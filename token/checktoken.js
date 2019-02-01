const jwt = require('jsonwebtoken')
const Secret = require('./Secret.js')
const jwtSecret = Secret
module.exports = (tokens) => {
	if (tokens) {
		// 解析
		let value = tokens.split(' ')[1]
		let decoded = jwt.decode(value, jwtSecret)
		// let decoded = jwt.decode(tokens, jwtSecret)
		return decoded
	}
}