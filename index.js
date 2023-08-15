require('dotenv').config()
require('./mongo')

const Note= require('./models/Note')
const User= require('./models/User')

const express= require('express')
const cors= require('cors')
const app= express()

const notFound= require('./middleware/notFound')
const handleErrors= require('./middleware/handleErrors')

const usersRouter= require('./controllers/users')
const notesRouter= require('./controllers/notes')
const loginRouter = require('./controllers/login')

app.use(express.json())
app.use(cors(
    {
        origin:'*'
    }
))

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/api/notes', notesRouter)

app.post('/api/notes', async (request,response)=>{

    const {content, important=false }= request.body

    const {userId}= request

    console.log(userId)

     const user= await User.findById(userId)

     console.log(user)

    if(!content){
        return response.status(400).json({
            error: 'note.content is missing'
        })}
        
    const newNote= new Note({

        content,
        date: new Date(),
        important,
        user: user._id
    })
    try {
    const savedNote= await newNote.save()

    user.notes= user.notes.concat(savedNote._id)
    await user.save()

    response.json(savedNote)

    } catch (error){
      console.error(error)
    }
    
})

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

app.use(notFound)

app.use(handleErrors)

const PORT= process.env.PORT
const server= app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

module.exports= {app, server}