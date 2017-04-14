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
        .forEach(host => {
          let req = {
            method: spec.method,
            url: host + spec.url,
            body: spec.body
          }
          cases.push({req: req})
        })
    })
  console.log(cases)
  caseRef.set(cases)
}

export default {
  processTest
}
