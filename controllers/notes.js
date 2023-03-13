const notesRouter= require('express').Router()
const Note= require('../models/Note')

notesRouter.get('/', async (request,response)=>{
    const notes= await Note.find({})
    response.json(notes)
})



module.exports = notesRouter

