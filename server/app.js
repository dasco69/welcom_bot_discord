const express = require('express')
const app = express()
const PORT = 3000



app.use('/', (res, req)=> {
    
})

app.listen(PORT, ()=> {
    console.log(`Vous écoutez http://localhost:${PORT}`)
})

module.exports = app