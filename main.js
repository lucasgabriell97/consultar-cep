const submitButton = document.querySelector('#app form button')
const zipCodeField = document.querySelector('#app form input')
const content = document.querySelector('#app main')

submitButton.addEventListener('click', getZipCode)

function getZipCode(e) {
    e.preventDefault()

    let zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()
    
    axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then(res => {
        if(res.data.erro) {
            throw new Error('CEP inválido')
        }

        content.innerHTML = ''
        createLine(res.data.logradouro)
        createLine(res.data.bairro)
        createLine(`${res.data.localidade}-${res.data.uf}`)
    })
    .catch(error => {
        content.innerHTML = ''
        createLine('Ops, CEP inválido!')
    })
}

function createLine(text) {
    let line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)  
}