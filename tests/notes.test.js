const mongoose       = require('mongoose')
const supertest      = require('supertest')
const {app, server } = require ('../index')

const api= supertest(app)

test('There are two notes', async ()=>{
    const response= await api.get('/api/notes')
    expect(response.body).toHaveLength(2)
})

afterAll(()=>{
    mongoose.connection.close()
    server.close()
})