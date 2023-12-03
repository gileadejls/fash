require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const User = require('./src/models/loginmodel')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    app.emit('ready')
    console.log('Conectado ao banco de dados!')
})

const validaCookie = (req, res, next) =>{
    console.log(req.cookies.tokenCookie)
    next()
}

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', 'src/views')
app.set('view engine', 'ejs')


// HOME
app.get('/', (req, res)=>{
    res.render('index', {user: null})
})

// LOGIN
app.get('/login', validaCookie, (req, res)=>{

    res.render('login', {fails: null})
})

//FAZER LOGIN
app.post('/login', async (req, res)=>{
    const login = new User(req.body)
    let result = await login.logar(req.body)

    if(!result){
        console.log(login.errors)
        res.render('login', {fails: login.errors})
    }else{
        //GERANDO O TOKEN
        let idUser = login.user._id
        console.log(idUser)
        const token = jwt.sign({ idUser }, process.env.SECRETKEY, {expiresIn: '1h'})
        console.log(token)

        //SALVANDO TOKEN NO COOKIE
        res.cookie('tokenCookie', token, {maxAge: '900000', httpOnly: true})
        res.render('index', {user: req.body.nome})
    }

})

//CADASTRAR
app.get('/cadastro', (req, res)=>{
    res.render('cadastro', {success: false, fails: null})
})

//FAZER CADASTRO
app.post('/cadastro', async (req, res)=>{
    console.log(req.body)
    const cadastro = new User(req.body)
    let result = await cadastro.cadastrar()
    if(!result){
        console.log("Não foi possivel cadastrar usuario")
        console.log("Os seguintes erros: ", cadastro.errors)
        res.render('cadastro', {success: false, fails: cadastro.errors})
    }else{
        console.log("Usuario cadastrado com sucesso!")
        res.render('cadastro', {success: true, fails: null})
    }


})

app.on('ready', ()=>{ 
    app.listen(3000, ()=>{
        console.log('Servidor Online')
    })
})