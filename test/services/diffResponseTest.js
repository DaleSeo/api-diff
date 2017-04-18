import diffResponse from '../../src/services/diffResponse'

let resA = {
  statusCode: 200,
  statusText: 'Created',
  headers: {
    'cache-control': 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    'expires': '-1',
    'pragma': 'no-cache',
    'date': 'Tue, 18 Apr 2017 02:16:21 GMT'
  },
  body: {},
  text: '{}'
}

let resB = {
  statusCode: 200,
  statusText: undefined,
  headers: {
    'cache-control': 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    'expires': '-1',
    'pragma': 'no-cache',
    'date': 'Tue, 17 Apr 2017 02:16:21 GMT'
  },
  body: {},
  text: '{}'
}

let options = {
  excludeHeaders: ['date', 'x-sac-guid'],
  excludeBody: ['hostName', 'instanceName']
}

let result = diffResponse(resA, resB)
console.log('#result:', result)
