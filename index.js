require('dotenv').config()
require('./mongo')

const express= require('express')
const cors= require('cors')
const app= express()

const notFound= require('./middleware/notFound')
const handleErrors= require('./middleware/handleErrors')

const usersRouter= require('./controllers/users')
const notesRouter= require('./controllers/notes')
const loginRouter = require('./controllers/login')

app.use(express.json())
app.use(cors())

app.use('/api/notes', notesRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

app.use(notFound)

app.use(handleErrors)

const PORT= process.env.PORT
const server= app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

module.exports= {app, server}