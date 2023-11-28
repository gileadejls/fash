const menu = document.querySelector("#menu")
const close = document.querySelector("#close")
const mobileItems = document.querySelector(".menu-mobile-items")
const buttonCadastrar = document.querySelector('#button-cadastrar')
const cadastrarformulario = document.querySelector("#cadastrarformulario")

const container = document.querySelector("#container")

const userfail = document.querySelector('#userfail')
const emailfail = document.querySelector('#emailfail')
const passfail = document.querySelector('#passfail')
const passfail2 = document.querySelector('#passfail2')

menu.addEventListener("click", ()=>{
    mobileItems.style = "transform: translateX(0);"
})

close.addEventListener("click", ()=>{
    mobileItems.style = "display: hidden;"
})



if(buttonCadastrar){
    buttonCadastrar.addEventListener("click", (event)=>{

        event.preventDefault()
    
        const data = validate('registrar', null)
    
        if(data.nome === "" || data.password === "" || data.email === "" || !data){
            console.log("data invalida")
            return 
        }
    
        console.log("passou")
    
    
        fetch('/cadastro', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/html'
            },
            
            body: JSON.stringify(data)
        }).then(res => {
            if(res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(url => {
            if(url.msg){
                cadastrarformulario.style = 'display: none;'
                const div = document.createElement('div')
                div.innerHTML = `
                <div class="w-full text-center">
                    <h1 class="text-2xl font-bold">Cadastrado com sucesso!</h1>
                </div>
                `
                container.appendChild(div)
            }
        }).catch((e => console.log(e)))
    
    })
}



function validate(){
    const nome = document.querySelector('#nome')
    const email = document.querySelector('#email')
    const senha = document.querySelector('#senha')
    const senha2 = document.querySelector('#senha2')


    // DEIXANDO O ESTILO DO ERRO ZERADO
    passfail.textContent = ""
    passfail2.textContent = ""
    emailfail.textContent = ""
    userfail.textContent = ""
    nome.style = 'border: none;'
    email.style = 'border: none;'
    senha.style = 'border: none;'
    senha2.style = 'border: none;'

    //REGEX PARA VALIDÇÃO
    let nomeRegex = /[^a-z]/gi
    let emailRegex = /.+@gmail.com/gi

    let nomeInvalido = nome.value.match(nomeRegex) !== null
    let tamanhoDoUserInvalido = nome.value.length >= 13
    let tamanhoDoEmailInvalido = email.value.length >= 30
    let tamanhoDaSenhaInvalida = senha.value.length >= 15 || senha2.value.length >= 15
    let emailInvalido = email.value.match(emailRegex) === null


    if(!nome.value || !email.value || !senha.value){
        alert("Por favor, preencha os campos.")
        return false
    }
    if(nomeInvalido || tamanhoDoUserInvalido){
        nome.style = 'border: 1px solid red;'
        userfail.textContent = "Usuario Invalido"
        return false
    }
    if(emailInvalido || tamanhoDoEmailInvalido){
        email.style = 'border: 1px solid red;'
        emailfail.textContent = "Por favor, digite um email valido"
        return false
    }
    if(senha.value !== senha2.value){
        senha.style = 'border: 1px solid red;'
        senha2.style = 'border: 1px solid red;'
        passfail.textContent = "As Senhas não coincidem"
        passfail2.textContent = "As Senhas não coincidem"
        return false
    }
    if(tamanhoDaSenhaInvalida){
        senha.style = 'border: 1px solid red;'
        senha2.style = 'border: 1px solid red;'
        passfail.textContent = "Tamanho maximo permitido é 15"
        passfail2.textContent = "Tamanho maximo permitido é 15"
        return false
    }



    return ({
        nome: nome.value,
        email: email.value,
        senha: senha.value
    })
    
}


