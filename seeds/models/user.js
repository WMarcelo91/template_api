const mongoose = require('mongoose')
const Users = mongoose.model('Users')

const password = Users.schema.methods.generateHash('123')
const active = true

module.exports = () => [
	new Users({
		name  : 'Wellington Marcelo',
		email: 'wellington-marcelo@hotmail.com',
		password
	})
]
