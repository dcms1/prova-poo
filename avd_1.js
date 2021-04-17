const { request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

//a)
const provas = [
    {
        id: '0',
        dia: 'Sabado',
        data: '10/03/2021',
        materia: 'POO',
        hora: '17:00',
        professor: 'Luiz Claudio'
    },
    {
        id: '1',
        dia: 'Sexta-feira',
        data: '16/03/2021',
        materia: 'Projeto interdiciplinar 2',
        hora: '19:00',
        professor: 'Carlos Eduardo'
    }
]


//b)
app.get('/provas', (request, response) => {
    return response.json(provas)
})
//c) ******
// verificar id

const checkID = (request, response, next) => {
    const { id } = request.params
    if (!provas[id]) {
        return response
            .status(400)
            .json({ Error: 'Não existe prova com este id' })
    }
    return next()
}

app.get('/provas/:id', checkID, (request, response) => {
    const { id } = request.params
    const prova = provas.find(prova => prova.id == id)

    return response.json(prova)

})
// d)
//retornar erro
const provaADD = (request, response, next) => {
    if (!request.body.id || !request.body.dia || !request.body.data || !request.body.materia || !request.body.hora || !request.body.professor) {
        return response
            .status(400)
            .json({ Error: 'O campo dia da semana ou data da avd ou disciplina ou horário ou professor não existe no corpo da requisição.' })
    }
    return next()
}
// postando
app.post('/provas', provaADD, (request, response) => {
    const { id, dia, data, hora, materia, professor } = request.body
    const prova = {
        id,
        dia,
        data,
        materia,
        hora,
        professor
    }
    provas.push(prova)
    return response.json(provas)
})

// e)
app.put('/provas/:ind'), provaADD, checkID, (request, response) => {
    const { id, dia, data, hora, materia, professor } = request.body
    const prova = {
        id,
        dia,
        data,
        materia,
        hora,
        professor
    }
    const ind = request.params
    provas[ind] = prova
    return response.json(provas)
}

// f) 
app.delete('/provas/:id'), checkID, (request, response) => {
    const { id } = request.params
    provas.splice(id, 1)
    return response.json(provas)
}

//g)

//h)
const verificarMAT=(request, response, next) =>{
    const materia = request.params
    if (!provas[materia]) {
        return response
            .status(400)
            .json({ Error: 'Não existe materia com este nome' })
    }
    return next()
}
app.get('/provas/:nomeMateria'),verificarMAT,(request,response)=>{
    const materia = provas.find(materia => provas.materia == materia)
}
//servidor rodando
app.listen(3333, () => {
    console.log('Servidor rodando');

})


