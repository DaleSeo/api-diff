import db from './database'

export function fireGet (key, filterKey, filterVal) {
  return new Promise((resolve, reject) => {
    let ref = db.ref(key)
    if (filterKey) {
      ref = ref.orderByChild(filterKey).equalTo(filterVal)
    }
    ref.once('value').then(data => {
      resolve(data.toJSON())
    })
  })
}

export function fireSet (key, data) {
  db.ref(key).set(data)
}

export function firePush (key, data) {
  return new Promise((resolve, reject) => {
    db.ref(key).push(data).then(data => {
      resolve(data.key)
    })
  })
}

export function fireRemove (key) {
  return new Promise((resolve, reject) => {
    db.ref(key).remove().then(_ => {
      resolve()
    })
  })
}
