const mongoose= require('mongoose')

const {MONGO_DB_URI, MONGO_DB_TEST, NODE_ENV}= process.env

const conectionString= NODE_ENV === 'test'
? MONGO_DB_TEST
: MONGO_DB_URI


mongoose.connect(conectionString)
.then(()=>{
    console.log('Database connected')
}).catch(e=>{
    console.error(e)
})


