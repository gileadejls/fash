const mongoose = require('mongoose')

const LoginShema = new mongoose.Schema({
    user: String,
    email: String,
    password: String
})

const LoginModel = mongoose.model('login', LoginShema)

class  Login {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async logar(){
        if(this.body.nome === "" || this.body.senha == ""){
            console.log("data invalida")
            this.errors.push("Campos Vazios")
            return
        }

        try {
            this.user = await LoginModel.findOne({user: this.body.nome, password: this.body.senha })
            if(!this.user){
                this.errors.push('Usuario Ou Senha Invalidos')
                return
            }

            return true
        } catch (e) {
            console.log(e)
        }
    }


    async cadastrar(){
        this.validate()
        console.log(this.body)

        if(this.errors.length > 0){
            console.log("erro aconteceu")
            return false
        }
        try{
            console.log("foi enviado mesmo assim")
            this.user = await LoginModel.create({user: this.body.nome, email: this.body.email, password: this.body.senha})
            return true

        } catch (e) {
            console.log(e)
        }
    }

    validate(){
        const vazio = this.body.nome === '' || this.body.email === '' || this.body.senha === ''


        if(vazio || this.body === undefined ){
            this.errors.push("Campos Vazios")
        }

    }
}

module.exports = Login