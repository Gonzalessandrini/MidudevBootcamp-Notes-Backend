const notesRouter= require('express').Router()
const Note= require('../models/Note')
const userExtractor= require('../middleware/userExtractor')
const User= require('../models/User')

notesRouter.get('/', async (request,response)=>{
    const notes= await Note.find({}).populate('user')
    response.json(notes)
})

notesRouter.get('/:id',userExtractor, async (request,response)=>{
    const note= await Note.findById(request.params.id)
    response.json(note)
})

notesRouter.put('/:id',async (request, response, next) => {
    try{
    const { id } = request.params
    const note = request.body
  
    const newNoteInfo = {
      content: note.content,
      important: note.important
    }
  
    const noteUpdate= await Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    
    response.json(noteUpdate)
  }catch(err){
        next(err)
  }
})

notesRouter.post('/',userExtractor, async (request,response)=>{

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


// notesRouter.post('/', async (request,response)=>{

//     const {content, important=false }= request.body

//     const {userId}= request

//      const user= await User.findById(userId)

//     if(!content){
//         return response.status(400).json({
//             error: 'note.content is missing'
//         })}
        
//     const newNote= new Note({

//         content,
//         date: new Date(),
//         important,
//         user: user._id
//     })
//     try {
//     const savedNote= await newNote.save()

//     user.notes= user.notes.concat(savedNote._id)
//     await user.save()

//     response.json(savedNote)

//     } catch (error){
//       console.error(error)
//     }
    
// })

notesRouter.delete('/:id',userExtractor, async (request,response,next)=>{
    const {id}=request.params

    await Note.findByIdAndDelete(id)

    response.status(204).end()
})

module.exports = notesRouter

