const mongoose = require('mongoose')
const Users = mongoose.model('Users')

const hash = require('../../../../helpers/hash')
const token = require('../../../../config/constants').secret
const jwt = require('jsonwebtoken');

const login = async (ctx, next) => {

  const params = ctx.request.body
  const user = await Users.findOne({
    email: params.email
  })
  if (!user) {
    ctx.body = "Usuário não encontrado no Sistema"
    return ctx.status = 404
  }
  if (!await hash.compare(params.password, user.password)) {
    ctx.body = "Senha não Confere"
    return ctx.status = 404
  }

  user['password'] = undefined

  const authUser = jwt.sign({
    value: user
  }, token);

  ctx.body = authUser
  return ctx.status = 202
}


module.exports = {
  login
}
