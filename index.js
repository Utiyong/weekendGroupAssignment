const express = require('express')
require('dotenv').config()

const PORT = 2094

const app = express()
app.use(express.json())

const orgRouter = require('./router/organizationRoute')

app.use(orgRouter)


app.listen(PORT, ()=>{
    console.log(`the app is listening on PORT: ${PORT}`)
})