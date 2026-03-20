const express = require('express')

const PORT = 2094

const app = express()
app.use(express.json())




app.listen(PORT, ()=>{
    console.log(`the app is listening on PORT: ${PORT}`)
})