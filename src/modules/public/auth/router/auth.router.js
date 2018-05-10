
const Router = require('koa-router')
let router = new Router()

const baseUrl = '/auth/'
const controller = require('../controller/auth.controller')

router.post(`${baseUrl}login`, async (ctx, next) => controller.login(ctx, next))

module.exports = router
