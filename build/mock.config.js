const fs = require('fs'),
  path = require('path')

//const mockBaseURL = 'http://localhost:3000'
const mockBaseURL = 'https://note-server.hunger-valley.com'
const realBaseURL = 'https://note-server.hunger-valley.com'

exports.config = function ({ isDev = true } = { isDev: true }) {
  const fileTxt = `module.exports = {
  baseURL: '${isDev ? mockBaseURL : realBaseURL}'
}
`

  fs.writeFileSync(
    path.join(__dirname, '../src/helpers/config-baseURL.js'),
    fileTxt
  )
}
