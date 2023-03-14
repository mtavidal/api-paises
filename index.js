
let arrayPaises = [];
let contador = 0;
function listarPaises () {
    let endpoint = `https://restcountries.com/v3.1/all`
    fetch(endpoint)
        .then(response => {
           return response.json();
        })
        .then(data => {
            arrayPaises = data;
            contador += 16;
            preencherCardsPaises(arrayPaises.slice(0,16));
        })
        .catch(error => {
            console.error("Error: " + error);
        })
}

listarPaises ()

function preencherCardsPaises(data){
    let divPais = document.getElementById("containerPaises");
    console.log(data);
    data.forEach(pais => { 
        divPais.innerHTML += `
        <div id="cardPaises" class="classCard">
            <img src="${pais.flags.png}" >
            <div>
                <h1>${pais.name.common}</h1>
                <h2><b>Population:</b> ${pais.population}</h2>
                <h2><b>Region:</b> ${pais.region}</h2>
                <h2><b>Capital:</b> ${pais.capital}</h2>
                <div id="divImagem"><img id="dedo" src="./imagens/tap-svgrepo-com.png"></div>
            </div>
        </div>    
        ` 
    });

    const cardMore = document.getElementsByClassName("classCard");
    for (let index = 0; index < cardMore.length; index++) {
        cardMore[index].onclick = () => {

            let modal = document.getElementById("dv-modal");
            if (typeof modal == 'undefined' || modal === null)
                return;
            let cardModal = document.getElementById("cardModal");
        
            const convertObjectToArray = (objeto) => {
                const arrayValue = []; 
                Object.keys(objeto).forEach(key => {
                  // adiciono a chave e o valor do objeto no novo arraycurrencies
                    arrayValue.push({ key, value: objeto[key]});
                })
                return arrayValue; 
              }
              let moeda = convertObjectToArray(data[index].currencies);
              let idiomas = convertObjectToArray(data[index].languages);
              let lingua = ""; 
              for (let index = 0; index < idiomas.length; index++) {
                lingua += idiomas[index].value + ", ";
              }
              lingua = lingua.substring(0, lingua.length - 2) + ".";
            cardModal.innerHTML = `
            <div class="modal-header">
                <h1> More About <u>${data[index].name.common}</u></h1>
            </div>

            <div class="modal-body">
                <p><b>Subregion:</b> ${data[index].subregion === undefined ? " - " : data[index].subregion}</p>
                <p><b>Borders:</b> ${data[index].borders === undefined ? " - " : data[index].borders}</p>
                <p><b>Main Currency:</b> ${data[index].currencies === undefined ? " - " : moeda[0].value.name + " (" + moeda[0].key + ") | symbol: " + moeda[0].value.symbol +""}</p>
                <p><b>Languages:</b> ${data[index].languages === undefined ? " - " : lingua}</p>
            </div>

            <div class="modal-footer">
                <button class="btnFechaModal">Fechar</button>
            </div>`

            modal.style.display = 'Block';
            document.body.style.overflow = 'hidden';
            const btnFechaModal = document.getElementsByClassName("btnFechaModal");
            for (let index = 0; index < btnFechaModal.length; index++) {
                btnFechaModal[index].onclick = () => {
                    let modal = document.getElementById("dv-modal");

                    if (typeof modal == 'undefined' || modal === null)
                        return;

                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        }   
    }
}

const btnMore = document.getElementById("btnNext");
btnMore.onclick = () => {
    preencherCardsPaises(arrayPaises.slice(contador,contador+16))
    contador += 16;
    if (contador >= arrayPaises.length ){
        btnMore.style.display = "none";
    }
}


const buscar = document.getElementById("idForm")
const paisBuscado = document.getElementById("search")
buscar.addEventListener("submit", (event) => {
    event.preventDefault();
    let divPais = document.getElementById("containerPaises");
    divPais.innerHTML="";
    const btnMore = document.getElementById("btnNext");
    btnMore.style.display="none";
    let translation = paisBuscado.value;
    let endpoint = `https://restcountries.com/v3.1/translation/${translation}`
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                let err = new Error("HTTP status code: " + response.status);
                err.response = response;
                err.status = response.status;
                throw err;
            }
            return response.json();
        })
        .then(data => {
            arrayPaises = 0;
            preencherCardsPaises(data);
        })
        .catch(error => {
            console.error("Erro: " + error);
            if (error.status === 404) {
                alert ("País não encontrado, digite corretamente. Em português, colocar acentos")
            }
        })

})


const buscarRegioes = document.getElementById("regioes")
buscarRegioes.onchange = () => {
    let divPais = document.getElementById("containerPaises");
        divPais.innerHTML="";
        btnMore.style.display="block";
        contador=0;
        let region = buscarRegioes.value;
        let endpoint = `https://restcountries.com/v3.1/${region}`
        fetch(endpoint)
            .then(response => {
               return response.json();
            })
            .then(data => {
                arrayPaises = data;
                contador += 16;
                preencherCardsPaises(arrayPaises.slice(0,16));
            })
            .catch(error => {
                console.error("Error: " + error);
            })
}
