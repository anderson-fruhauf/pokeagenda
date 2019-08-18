// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let Pokemon = require('./file/pokemon');
const {ipcRenderer} = require('electron');
const {BrowserWindow} = require('electron').remote
const path = require('path')

const anterior = document.getElementById('btnAnterior');
const proximo = document.getElementById('btnProximo');
const cardNome = document.getElementById('cardNome');
const cardTipo = document.getElementById('cardTipo');
const cardContador = document.getElementById('contador');
const btnBuscar = document.getElementById('btnBuscar');
const inpBuscar = document.getElementById('inpBuscar');
const btnRemove = document.getElementById('btnRemove');
const btnCadastra = document.getElementById('btnCadastra');

const notification = {
    title: 'Alerta',
    body: 'Alerta'
}

let pokemon = new Pokemon();
let atual = 0;

refresh();


anterior.addEventListener('click', () =>{
    if(atual>0){
        atual--;
        refresh();
    }
})

proximo.addEventListener('click', () =>{
    if(atual<(pokemon.count()-1)){
        atual++;
        refresh();
    }
})

btnBuscar.addEventListener('click', () => {
    let value = inpBuscar.value;
    if(value){
        try{
            let res = pokemon.getName(value);
            if(res){
                if(pokemon.indexOf(res)){
                    atual = pokemon.indexOf(res);
                    refresh();
                }
            }else{
                notification.body = 'nenhum resultado encontrado';
                const myNotification = new window.Notification('Alerta', notification);
            }
        }catch(err){
            alert(err);
        }
        
    }else{
        notification.body = 'Nenhum parametro para busca';
        const myNotification = new window.Notification('Alerta', notification);
    }
})

btnRemove.addEventListener('click', (event) => {
    ipcRenderer.send('open-information-dialog', pokemon.get(atual).name);
})

ipcRenderer.on('information-dialog-selection', (event, index) => {
    if (index === 0){
        pokemon.remove(pokemon.get(atual).name);
        if(atual>0){
            atual--;
        }else{
            atual++;
        }
        refresh();
    }
})

btnCadastra.addEventListener('click', ()=>{
    const modalPath = path.join('./index.html')
    let win = new BrowserWindow({ width: 1000, height: 1000 })
  
    win.on('close', () => { win = null })
    win.loadURL(modalPath)
    win.show()
})

function refresh(){
    cardNome.innerHTML = pokemon.get(atual).name;
    cardTipo.innerHTML = 'É um pokemon com tipo: ' + pokemon.get(atual).type;
    cardContador.innerHTML = 'pokemon numero ' + (atual + 1) + ' de ' + pokemon.count();
}