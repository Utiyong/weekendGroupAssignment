const express = require('express')
require('dotenv').config()

const PORT = 2094

const app = express()
app.use(express.json())

const orgRouter = require('./router/organizationRoute')
const staffRouter = require('./router/staffRoute')
const orderRoute = require('./router/orderRouter')

const equipmentRouter = require('./router/equipment')

app.use(orgRouter)
app.use(staffRouter)
app.use(equipmentRouter)
app.use(orderRoute)


app.listen(PORT, ()=>{
    console.log(`the app is listening on PORT: ${PORT}`)
})