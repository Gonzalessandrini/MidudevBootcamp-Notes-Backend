const jwt = require('jsonwebtoken')
const JsonWebTokenError= require('./errors/jsonWebTokenError')

module.exports = (request, response, next) => {

  try{
    const authorization = request.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
     throw new JsonWebTokenError('Token is missing or invalid');
  }

  const { id: userId } = decodedToken

  request.userId = userId

  next()
  }catch(err){
    console.error(err.name)
    next(err)
  }
  
}