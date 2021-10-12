const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = config.get('port')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express()

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.json())
app.use(cors())

app.use('/auth', require('./routes/auth.routes.js'))
app.use('/user', require('./routes/user.routes.js'))
app.use('/questionnaire', require('./routes/questionnaire.routes.js'))
app.use('/views', require('./routes/view.routes.js'))

let options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Animal dating site api",
            version: "1.0.0",
            description: "We must pull up our pants"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ],
    },
    apis: ["./routes/*.js", "./models/*.js"],
}

const specs = swaggerJsDoc(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));



function start(){
    try{
        mongoose.connect(config.get('mongoUri'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            () => console.log('MongoDB connected')
        )
        app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT} ${config.get('mongoUri')}`)
        })
    }
    catch (e) {
        console.log(e);
    }
}
start()


