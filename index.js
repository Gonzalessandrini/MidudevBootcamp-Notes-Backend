require('dotenv').config()
require('./mongo')

const User= require('./models/User')
const Note= require('./models/Note')

const express= require('express')
const cors= require('cors')
const app= express()
const logger= require ('./loggerMiddleware')

const usersRouter= require('./controllers/users')
const notesRouter= require('./controllers/notes')



app.use(express.json())
app.use(cors())


app.get('/', (request,response)=>{
    response.send('<h1>Hello World</h1>')
})

app.use('/api/notes', notesRouter)

app.use('/api/notes/:id', notesRouter)

app.delete('/api/notes/:id', (request,response,next)=>{
    const {id}=request.params

    Note.findByIdAndRemove(id).then(result=>{
        response.status(204).end()
    }).catch(error=> next(error))


})

app.post('/api/notes', async (request,response, next)=>{
    const {
         content,
         important=false,
         userId
        }= request.body

     const user= await User.findById(userId)

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
      next(error)
    }
    
})

app.use('/api/users', usersRouter)

app.use((error,request,response,next)=>{
    console.error(error)
    if (error.name === 'CastError'){
        response.status(400).end()
    }else{
        response.status(500).end()
    }
})

const PORT= process.env.PORT
const server= app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

module.exports= {app, server}