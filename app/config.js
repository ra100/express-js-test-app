module.exports = {
  db: {
    prod: 'mongodb://localhost:27017/prod',
    test: 'mongodb://localhost:27017/test',
  },
  server: {
    port: 1337
  },
  file: {
    path: '.tmp',
    name: 'data.json'
  },
  log: {
    name: 'log'
  }
}