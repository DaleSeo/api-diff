import _ from 'lodash'

export default function diff (resA, resB) {
  return _.isEqual(resA.body, resB.body)
}
