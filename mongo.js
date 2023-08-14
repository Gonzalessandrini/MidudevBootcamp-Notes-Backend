const mongoose= require('mongoose')

const {MONGO_DB_URI, MONGO_DB_TEST, NODE_ENV}= process.env

const conectionString= NODE_ENV === 'test'
? MONGO_DB_TEST
: 'mongodb+srv://alessandrinigonzalo3:44662130Xds12@cluster0.qprecjz.mongodb.net/app-notes?retryWrites=true&w=majority'


mongoose.connect(conectionString)
.then(()=>{
    console.log('Database connected')
}).catch(e=>{
    console.error(e)
})


