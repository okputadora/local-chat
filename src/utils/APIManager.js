import superagent from 'superagent'

export default {
  // turn super agent into a utility class (think of a utility class as
  // toolbox that can be used on multiple different projects e.g. converting
  // a timestamp to human readable format, or making an external api request
  // like we're doing below)
  get: (url, params, callback) => {
    superagent
    .get(url)
    .query(params)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err){
        callback(err, null)
        return
      }
      // response.body = the payload
      const confirmation = response.body.confirmation
      if (confirmation == 'success'){
        callback(null, response.body.results)
      }
    })
  },
  post: (url, body, callback) => {
    console.log("POSTING")
    superagent
    .post(url)
    .send(body)
    .set('Accept', 'application/json')
    .end((err, response) => {
      console.log("got a response")
      if (err){
        callback(err, null)
        return
      }
      // response.body = the payload
      const confirmation = response.body.confirmation
      if (confirmation == 'success'){
        callback(null, response.body.results)
      }
    })
  }
  // put:
  // delete: (url, )
}
