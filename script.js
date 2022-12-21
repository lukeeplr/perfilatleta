function renderCard() {
    gerarImagem()
    gerarNome()
    gerarIdade()
    gerarAltura()
    gerarPeso()
    gerarIMC()
    gerarGasto()
}



function gerarImagem() {
    espaco_imagem.innerHTML = ''
    var sexo = 'fem'
    const imputs = Rx.Observable.of(elemento_sexo)
    imputs
        .filter (imp => imp[0].checked == true)
        .subscribe (imp => sexo = imp[0].defaultValue)
    var imagem = document.createElement('img')
    if (sexo == 'fem') {
        imagem.setAttribute('src','woman.png')
    } 
    else {
        imagem.setAttribute('src','man.png')
    }
    espaco_imagem.appendChild(imagem) 
    gerarGasto()
}


function gerarNome() {
    espaco_nome.innerHTML = ''
    var nome = document.createElement('p')
    var nome_txt = document.createTextNode(document.querySelector('#nome').value)
    nome.appendChild(nome_txt)
    espaco_nome.appendChild(nome)
}


function gerarIdade() {
    espaco_idade.innerHTML = ''
    var idade = document.createElement('p')
    var idade_txt = document.createTextNode(document.querySelector('#idade').value + ' anos')
    idade.appendChild(idade_txt)
    if (document.querySelector('#idade').value != '') {
        espaco_idade.appendChild(idade)
    }
    gerarGasto()
}


function gerarAltura() {
    espaco_altura.innerHTML = ''
    var altura = document.createElement('p')
    var altura_txt = document.createTextNode((document.querySelector('#altura').value/100) + ' m')
    altura.appendChild(altura_txt)
    if (document.querySelector('#altura').value != '') {
        espaco_altura.appendChild(altura)
    }
    gerarIMC()
    gerarGasto()
}


function gerarPeso() {
    espaco_peso.innerHTML = ''

    var peso = document.createElement('p')
    var peso_txt = document.createTextNode((document.querySelector('#peso').value) + ' kg')
    peso.appendChild(peso_txt)

    if ((document.querySelector('#peso').value) != '') {
        espaco_peso.appendChild(peso)
    }
    gerarIMC()
    gerarGasto()
}


function gerarIMC() {
    espaco_imc.innerHTML = ''

    if ((document.querySelector('#altura').value != '') && ((document.querySelector('#peso').value) != '')) {
        var res = (document.querySelector('#peso').value)/((document.querySelector('#altura').value/100)**2)
        var situacao = ''

        if (res < 18.5) {
            situacao = ' (Magreza)' 
        } else if (res <= 24.9){
            situacao = ' (Normal)'
        } else if (res <= 29.9) {
            situacao = ' (Sobrepeso)'
        } else if (res <= 39.9) {
            situacao = ' (Obesidade)'
        } else {
            situacao = ' (Obesidade grave)'
        }

        var imc = document.createElement('p')
        var imc_txt = document.createTextNode('IMC: '+res.toFixed(2)+situacao)
        imc.appendChild(imc_txt)
        espaco_imc.appendChild(imc)
    }
}


function gerarGasto() {
    espaco_gasto.innerHTML = ''

    var sexo = 'fem'
    const imputs = Rx.Observable.of(elemento_sexo)
    imputs
        .filter (imp => imp[0].checked == true)
        .subscribe (imp => sexo = imp[0].defaultValue)
    
    if ((document.querySelector('#altura').value != '') && ((document.querySelector('#peso').value) != '') && (document.querySelector('#idade').value != '') && (sexo != '')) {
        var fator = 0
        var nivel = document.querySelector('#nivel').value
        
        if (nivel == 'seden') {
            fator = 1.2
        } else if (nivel == 'levea') {
            fator = 1.375
        } else if (nivel == 'modea') {
            fator = 1.55
        } else if (nivel == 'altaa') {
            fator = 1.725
        } else {
            fator = 1.9
        }

        if (sexo == "fem") {
            var res = (fator * (655 + (9.6 * document.querySelector('#peso').value) + (1.8 * document.querySelector('#altura').value) - (4.7 * document.querySelector('#idade').value)))
        } else {
            var res = (fator * (66 + (13.7 * document.querySelector('#peso').value) + (5 * document.querySelector('#altura').value) - (6.8 * document.querySelector('#idade').value)))
        }

        var gasto = document.createElement('p')
        var gasto_txt = document.createTextNode('Gasto: '+ res.toFixed() + ' kcal')
        gasto.appendChild(gasto_txt)
        espaco_gasto.appendChild(gasto)
    }
} 


var elemento_atividade = document.querySelector('#nivel')
const alterouAtividade = Rx.Observable.fromEvent(elemento_atividade, 'change')
alterouAtividade.subscribe(change => gerarGasto())

var elemento_idade = document.querySelector('#idade')
const alterouIdade = Rx.Observable.fromEvent(elemento_idade, 'keyup')
alterouIdade.subscribe(keyup => gerarIdade())

var elemento_peso = document.querySelector('#peso')
const alterouPeso = Rx.Observable.fromEvent(elemento_peso, 'keyup')
alterouPeso.subscribe(keyup => gerarPeso())

var elemento_nome = document.querySelector('#nome')
const alterouNome = Rx.Observable.fromEvent(elemento_nome, 'keyup')
alterouNome.subscribe(keyup => gerarNome())

var elemento_altura = document.querySelector('#altura')
const alterouAltura = Rx.Observable.fromEvent(elemento_altura, 'keyup')
alterouAltura.subscribe(keyup => gerarAltura())

var elemento_sexo = document.getElementsByName('sexo')
const alterouSexo = Rx.Observable.fromEvent(elemento_sexo, 'change')
alterouSexo.subscribe(click => gerarImagem())

var card = document.querySelector('#card')
var espaco_nome = document.querySelector('#espaco_nome')
var espaco_imagem = document.querySelector('#espaco_imagem')
var espaco_idade = document.querySelector('#espaco_idade')
var espaco_altura = document.querySelector('#espaco_altura')
var espaco_peso = document.querySelector('#espaco_peso')
var espaco_imc = document.querySelector('#espaco_imc')
var espaco_atividade = document.querySelector('#espaco_atividade')
var espaco_gasto = document.querySelector('#espaco_gasto')
renderCard()
