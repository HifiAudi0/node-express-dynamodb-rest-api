const express = require('express')
const app = express()
const port = 3020
var cors = require('cors')

app.use(cors())

const bodyParser = require('body-parser')

const createServer = async () => {
    app.use(bodyParser.json())

    // routes
    require(`./src/routes/api`)(app);

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    })
};

module.exports = {
    createServer,
};
