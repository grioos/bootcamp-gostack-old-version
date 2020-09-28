const express = require('express')

const server = express()

server.use(express.json())

let requisitions = 1

server.use((req, res, next) => {
    console.log(`Já se foram feitam ${requisitions} requisições`)

    requisitions += 1

    next()
})

function checkIdExists(req, res, next) {
    const project = projects.find(project => project.id == req.params.id)

    if(!project) {
        return res.status(400).json({ error: 'Project does not exists'})
    }

    req.project = project

    next()
}

const projects = []

server.get('/projects', (req, res) =>{
    return res.json(projects)
})

server.get('/projects/:id', checkIdExists, (req, res) =>{
    return res.json(req.project)
})

server.post('/projects', (req, res) => {
    projects.push(req.body)

    return res.json(projects)
})

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
    req.project.tasks = req.body.title  

    return res.json(projects)
})

server.put('/projects/:id', checkIdExists, (req, res) => {
    req.project.title = req.body.title

    return res.json(projects)
})

server.delete('/projects/:id', checkIdExists,  (req, res) => {
    projects.splice(req.project, 1)

    return res.send()
})

server.listen(3000)