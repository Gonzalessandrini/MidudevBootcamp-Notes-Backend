const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.get('/', (req,res)=>{
  res.send('LOGIN ROUTER')
})

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username }).populate('notes')

  const passwordCorrect = user == null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'invalid user or password'
    })
  }else{
    const userForToken = {
      id: user._id,
      username: user.username
    }
  
    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24 * 7
      }
    )
  
    response.send({
      name: user.name,
      username: user.username,
      notes:user.notes,
      id:user.id,
      token
    })
  }

  
})

module.exports = loginRouter