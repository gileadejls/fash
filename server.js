require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const User = require('./src/models/loginmodel')
const bodyParser = require('body-parser')
const { log } = require('console')


app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    app.emit('ready')
    console.log('Conectado ao banco de dados!')
})




app.use(express.static(path.join(__dirname, 'public')));

app.set('views', 'src/views')
app.set('view engine', 'ejs')


// HOME
app.get('/', (req, res)=>{
    res.render('index', {user: null})
})

// LOGIN
app.get('/login', (req, res)=>{
    res.render('login', {err: null})
})

//FAZER LOGIN
app.post('/login', async (req, res)=>{
    console.log(req.body, 'aquii')

    const login = new User(req.body)
    let result = await login.logar(req.body)

    console.log(result)

    if(!result){
        console.log(login.errors)
        res.render('login', {err: login.errors})
    }else{
        res.render('index', {user: req.body.nome})
    }

})

//CADASTRAR
app.get('/cadastro', (req, res)=>{
    res.render('cadastro', {success: false})
})

//FAZER CADASTRO
app.post('/cadastro', async (req, res)=>{
    console.log(req.body)
    const cadastro = new User(req.body)
    let result = await cadastro.cadastrar()
    console.log(result)

    if(!result){
        console.log("invalido")
        return
    }else{
        res.json({msg: "Cadastrado"})
    }



    



})

app.on('ready', ()=>{ 
    app.listen(3000, ()=>{
        console.log('Servidor Online')
    })
})