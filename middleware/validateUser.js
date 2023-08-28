const ValidationError= require('./errors/validationError')

const validateUser= (req,res,next)=>{
    try{
        const {name,username,password}= req.body

        validateName(name)
        validateUsername(username)
        validatePassword(password)

        next()

    }catch(err){
        next(err)
    }
}

const validateName = (name) => {
    const regexName = /^[a-zA-Z0-9 ]+$/;
  
    if (!name) {
      throw new ValidationError('Name is required');
    }
  
    if (!regexName.test(name)) {
      throw new ValidationError('Name can only contain letters, numbers, and spaces');
    }
  };

  const validateUsername = (username) => {
    const regexUsername = /^[a-zA-Z0-9_-]{3,16}$/;
  
    if (!username) {
      throw new ValidationError('Username is required');
    }
  
    if (!regexUsername.test(username)) {
      throw new ValidationError('Username can only contain letters, numbers, hyphens, and underscores, and must be between 3 and 16 characters');
    }
  };
  
  const validatePassword = (password) => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  
    if (!password) {
      throw new ValidationError('Password is required');
    }
  
    if (!regexPassword.test(password)) {
      throw new ValidationError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
    }
  };
  
  
module.exports= {validateUser}
  