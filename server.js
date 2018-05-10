//db
require('./src/config/mongoose')()
const db = require('./db')


// lib's
const http = require('http')
const bcrypt = require('bcryptjs')
const body = require('koa-body')
const convert = require('koa-convert')
const cors = require('koa-cors')
const corsError = require('koa-cors-error')
const compress = require('koa-compress')
const loggerMiddleware = require('koa-logger')
const mount = require('koa-mount')

// constants
const port = require('./src/config/constants').port
const token = require('./src/config/constants').secret
const logger = require('./src/helpers/logger')

// init
const Koa = require('koa')
const jwt = require('koa-jwt');

let app = new Koa()

// config koa
app.use(convert(corsError))
app.use(body())
app.use(convert(compress()))
app.use(loggerMiddleware())
app.use(convert(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  headers: ['Content-Type', 'Authorization'],
})))

// routers
app = require('./private')(app)
app = require('./public')(app)

app.use(jwt({
  secret: token
}).unless({
  path: [/^\/public/]
}));

// start
db.connection.on('connected', () => {
  http.createServer(app.callback()).listen(port, () => {
    logger.info(`Server Template listening at http://localhost:${port}/api/`)
  })
})
