const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())

app.get('/api/getdata', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send('Erro ao ler o arquivo')
    } else {
      res.send(JSON.parse(data))
    }
  })
})

app.put('/api/updata', (req, res) => {
  const newData = req.body
  fs.writeFile('./data.json', JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.log(err)
      res.status(500).send('Erro ao atualizar o arquivo')
    } else {
      res.send({ message: 'Dados atualizados com sucesso!' })
    }
  })
})

app.listen(5000, () => console.log('Server running on port 5000'))
