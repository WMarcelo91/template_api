require('../src/config/mongoose')()

const mongoose     = require('../src/models/base/mongoose')
const mongodb      = require('../src/config/mongodb')()
const populate     = require('./populate')
const co           = require('co')

//Seeds
const userSeed      = require('./models/user')

mongoose.connect(mongodb.connection.url, mongodb.options, (err) => {
	if (err) throw err

	return mongoose.connection.db.dropDatabase((iErr) => {
		if (iErr) throw iErr
		console.log('Seed starting')
		co(function* () {
			const users = yield populate(userSeed())
			process.exit()
		})
	})
})
