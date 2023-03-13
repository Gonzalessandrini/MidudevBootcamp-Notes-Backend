const User = require("../models/User")
const bcrypt= require('bcrypt')
const supertest      = require('supertest')
const {app,server} = require ('../index')
const mongoose= require('mongoose')

const api= supertest(app)

describe.only('creating a new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        
        const passwordHash= await bcrypt.hash('pswd', 10)
        const user = new User({username: 'cuckylon', passwordHash})

        await user.save()
    })

    test('works as expected creating a fresh username',async ()=>{
        const usersDB= await User.find({})
        const usersAtStart= usersDB.map(user=> user.toJSON())

        const newUser= {
            username:'Gonzalito',
            name:'Gonzalo',
            password:'12345'
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const userDBAfter= await User.find({})
        const usersAtEnd= userDBAfter.map(user=> user.toJSON())

        expect(usersAtEnd).toHaveLength(usersAtStart.length +1)

        const usernames= usersAtEnd.map(u=> u.username)
        expect(usernames).toContain(newUser.username)
    })

    afterAll(()=>{
        mongoose.connection.close()
        server.close()
    })
})