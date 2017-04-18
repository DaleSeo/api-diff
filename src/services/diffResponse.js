import _ from 'lodash'

export default function diffResponse (resA, resB, options) {
  return {
    status: diffStatus(resA.statusCode, resB.statusCode),
    headers: diffHeaders(resA.headers, resB.headers, options.excludeHeaders),
    body: diffBody(resA.headers, resB.headers, options.excludeBody)
  }
}

function diffStatus (statusA, statusB) {
  return statusA === statusB
}

function diffHeaders (headersA, headersB, excludes) {
  return _.isEqual(headersA, headersB)
}

function diffBody (bodyA, bodyB, excludes) {
  return _.isEqual(bodyA, bodyB)
}

function isValueEqual (valA, valB, excludes) {
  if (typeof valA !== typeof valB) {
    return false
  }
  if (Array.isArray(valA)) {
    return isArrayEqual(valA, valB, excludes)
  }

}

function isArrayEqual (arrA, arrB, excludes) {
  if (arrA.length !== arrB.length) {
    return false
  }
  for (let i in arrA) {
    if (!isValueEqual(arrA[i], arrB[i], excludes)) {
      return false
    }
  }
  return true
}
