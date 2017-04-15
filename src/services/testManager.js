import superagent from 'superagent'
import db from './database'

function processTest (apiKey, suiteKey) {
  findSpecsAndHosts(apiKey, suiteKey, (specs, hosts) => {
    pushCases(suiteKey, specs, hosts)
  })
}

function findSpecsAndHosts (apiKey, suiteKey, callback) {
  let specRef = db.ref('apis/' + apiKey).child('specs')
  let hostRef = db.ref('suites/' + suiteKey).child('hosts')

  let specs
  let hosts
  specRef.on('value', snapshot => {
    console.log('numOfSpecs:', snapshot.numChildren())
    specs = snapshot.toJSON()
    hostRef.on('value', snapshot => {
      console.log('numOfHosts:', snapshot.numChildren())
      hosts = snapshot.toJSON()
      callback(specs, hosts)
    })
  })
}

function pushCases (suiteKey, specs, hosts) {
  let caseRef = db.ref('suites/' + suiteKey).child('cases')
  console.log(caseRef.toString())

  let cases = []
  Object.values(specs)
    .filter(spec => !spec.skip)
    .forEach(spec => {
      Object.values(hosts)
        .forEach((host, idx) => {
          let req = {
            method: spec.method,
            url: host + spec.url,
            body: spec.body
          }
          callApi(req, (err, res) => {
            if (err) res = {error: err}
            console.log({req: req, res: res})
            cases.push({req: req, res: res})
            if (idx === Object.keys(hosts).length - 1) {
              console.log(cases)
              caseRef.set(cases)
            }
          })
        })
    })
}

function callApi (req, callback) {
  superagent(req.method, req.url)
    .send(req.body)
    .end((err, res) => {
      if (err) return callback(err)
      callback(null, {
        statusCode: res.statusCode,
        statusText: res.statusText || '',
        headers: res.header,
        body: res.body,
        text: res.text
      })
    })
}

export default {
  processTest
}
