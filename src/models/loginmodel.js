const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


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

            this.user = await LoginModel.findOne({user: this.body.nome})
            if(!this.user){
                this.errors.push('Usuario Inexistente')
                return
            }
            
            if(!bcrypt.compareSync(this.body.senha, this.user.password)){
                this.errors.push('Senha Invalida')
                return
            }

            //GERA O TOKEN PARA O USUARIO QUE ACABOU DE LOGAR

            return true
        } catch (e) {
            console.log(e)
        }
    }


    async cadastrar(){
        this.validate()
        console.log(this.body)

        if(this.errors.length > 0) return
        await this.userExist()
        
        if(this.errors.length > 0 ) return

        try{
            const salt = bcrypt.genSaltSync()
            this.body.senha = bcrypt.hashSync(this.body.senha, salt)
            this.user = await LoginModel.create({user: this.body.nome, email: this.body.email, password: this.body.senha})
            return true

        } catch (e) {
            console.log(e)
        }
    }

    async userExist(){
        const user = await LoginModel.findOne({ user: this.body.nome})

        if(user){
            this.errors.push("Usuario já existe!, faça login agora mesmo!")
            return
        }

        const email = await LoginModel.findOne({ email: this.body.email})

        if(email){
            this.errors.push("O Email ja foi cadastrado! faça login agora mesmo!")
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