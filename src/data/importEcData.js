import json from './ec.json'
import db from '../services/database'

let specRef = db.ref('apis/-KhQ6MTyGDA-W1CaALev/specs')

json.apis.forEach(api => {
  db.ref('apis/-KhQ6MTyGDA-W1CaALev/specs')
    .push({
      method: api.method,
      url: api.path,
      body: api.body || {},
      skip: api.skip,
      text: JSON.stringify(api.body, null, 2) || '',
      title: api.description || '',
      exclusion: api.ignoreKeys || []
    })
})
