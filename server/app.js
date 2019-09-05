const express = require('express')
const uploads = require('./utils/upload') // 上传js
const utils = require('./utils/utils')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/upload', uploads.uploadFile.single('f'), (req, res) => { // 第二种上传方案
  let date = utils.formatTime(new Date()).split(' ')[0]
  res.json({
    code: 0,
    data: '/uploads/' + date + '/' + req.file.filename
  })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
