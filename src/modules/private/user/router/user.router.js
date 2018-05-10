
const Router = require('koa-router')
let router = new Router()

const baseUrl = '/user/'
const controller = require('../controller/user.controller')

router.post(`${baseUrl}register`, async (ctx, next) => controller.register(ctx, next))

module.exports = router
