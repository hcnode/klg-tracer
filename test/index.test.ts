const path = require('path')
const childProcess = require('child_process')
import * as MockMongoServer from 'mongodb-mock-server';

const fork = function (name, done) {
  const filePath = require.resolve(path.join(__dirname, `fixtures/${name}`))
  const worker = childProcess.fork(filePath, {
    env: {
      ...process.env,
      NODE_ENV: 'test',
      DEBUG: 'PandoraHook:*'
    },
    execArgv: [
      '-r', 'ts-node/register',
      '-r', 'nyc-ts-patch',
      '-r', path.join(__dirname, './TestHelper.ts')
    ]
  })
  worker.on('message', (data) => {
    if (data === 'done') {
      worker.kill()
      done()
    }
  })
}

describe('unit test', () => {

  describe('tracer service', () => {
    it('should register http server ok', done => {
      fork('tracer-service-http-register', done)
    })

    // it('should register http client ok', done => {
    //   fork('http-record-query-and-data', done)
    // })
  })

  describe('http server', () => {
    it('should normal trace record', done => {
      fork('http', done)
    })

    it('should record http post data and query params', done => {
      fork('http-record-query-and-data', done)
    })
  })

  // describe('koa server', () => {
  //   it('should normal trace record', done => {
  //     fork('koa', done)
  //   })
  // })

  describe('mongoose', function () {
    let server

    before(() => {
      MockMongoServer.createServer(40001).then(_server => {
        server = _server

        server.setMessageHandler(request => {
          const doc = request.document
          if (doc.ismaster) {
            request.reply(MockMongoServer.DEFAULT_ISMASTER_36)
          } else if (doc.insert) {
            request.reply({ ok: 1, operationTime: Date.now() })
          } else if (doc.find) {
            request.reply({ ok: 1 })
          } else if (doc.endSessions) {
            request.reply({ ok: 1 })
          }
        })
      })
    })

    // it('should mongodb work ok', done => {
    //   fork('mongodb', done)
    // })

    it('should mongoose work ok', done => {
      fork('mongoose', done)
    })

    after(() => MockMongoServer.cleanup())

  })
})