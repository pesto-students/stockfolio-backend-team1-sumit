import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
 import getITCatalogue from './query.mjs';

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/catalogue', getITCatalogue)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })