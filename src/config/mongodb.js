module.exports = (mode) => {

  const dbName = 'TemplateDB'
  const port = process.env.MONGO_PORT || 27017
  const url = process.env.MONGO_HOST || `mongodb://localhost:${port}/${dbName}`

  const connection = {
    mode,
    port,
    url,
  }

  const options = {
    server: {
      poolSize: 5,
      socketOptions: {
        keepAlive: 1,
      },
    },
  }

  return {
    connection,
    options,
  }

}
