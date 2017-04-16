import db from './database'

export function fireGet (key) {
  return new Promise((resolve, reject) => {
    db.ref(key).once('value').then(data => {
      resolve(data.toJSON())
    })
  })
}

export function fireSet (key, data) {
  db.ref(key).set(data)
}

export function firePush (key, data) {
  db.ref(key).push(data)
}
