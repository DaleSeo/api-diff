import superagent from 'superagent'
import db from './database'

function processTest (apiKey, suiteKey) {
  let caseRef = db.ref('suites/' + suiteKey).child('cases')
  console.log(caseRef.toString())

  // let cases = []
  findSpecsAndHosts(apiKey, suiteKey)
    .then(makeReqs)
    .then(callApis)
    .then(promises => {
      Promise.all(promises)
        .then(ress => {
          console.log('=========================================================')
          console.log(ress)
          console.log('=========================================================')
        })
    })

  // caseRef.set(cases)

      // callApi(req, (err, res) => {
      //   if (err) res = {error: err}
      //   console.log({req: req, res: res})
      //   cases.push({req: req, res: res})
      //   if (idx === Object.keys(hosts).length - 1) {
      //     console.log(cases)
      //     caseRef.set(cases)
      //   }
      // })
}

function findSpecsAndHosts (apiKey, suiteKey) {
  console.log('### findSpecsAndHosts')
  let specRef = db.ref('apis/' + apiKey).child('specs')
  let hostRef = db.ref('suites/' + suiteKey).child('hosts')

  return new Promise((resolve, reject) => {
    let specs
    let hosts

    try {
      specRef.on('value', snapshot => {
        console.log('numOfSpecs:', snapshot.numChildren())
        specs = snapshot.toJSON()
        hostRef.on('value', snapshot => {
          console.log('numOfHosts:', snapshot.numChildren())
          hosts = snapshot.toJSON()
          resolve({specs, hosts})
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}

function makeReqs (val) {
  console.log('### makeReqs')
  // console.log(val)
  return new Promise((resolve, reject) => {
    try {
      let reqs = []
      Object.values(val.specs)
        .filter(spec => !spec.skip)
        .forEach(spec => {
          Object.values(val.hosts)
            .forEach((host, idx) => {
              let req = {
                method: spec.method,
                url: host + spec.url,
                body: spec.body
              }
              reqs.push({req})
            })
        })
      resolve(reqs)
    } catch (e) {
      reject(e)
    }
  })
}

function callApis (reqs) {
  console.log('### callApis')
  // console.log(reqs)
  return new Promise((resolve, reject) => {
    resolve(reqs.map(req => callApi(req)))
  })
}

function callApi (req) {
  console.log('### callApi')
  console.log(req)
  return new Promise((resolve, reject) => {
    superagent(req.method, req.url)
    .send(req.body)
    .end((err, res) => {
      if (err) {
        resolve(err)
      } else {
        resolve({
          statusCode: res.statusCode,
          statusText: res.statusText || '',
          headers: res.header,
          body: res.body,
          text: res.text
        })
      }
    })
  })
}

export default {
  processTest
}
