let Pokemon = require('./file/pokemon');

let pokemon = new Pokemon();

const notification = {
    title: 'Alerta',
    body: 'Alerta'
}

document.getElementById("btnCadastrar").addEventListener('click', () => {
    let name = document.getElementById('nome');
    let type1 = document.getElementById('tipo1');
    let type2 = document.getElementById('tipo2');

    if (!name.value) {
        alert('Nome não informado')
        return;
    }

    if (!type1.value) {
        alert('tipo principal não informado')
        notification.body = 'tipo 1 nao foi infomado';
        const myNotification = new window.Notification('Alerta', notification);
        return;
    }

    if (type2.value.length > 1) {
        try {
            pokemon.add(name.value, [type1.value, type2.value]);
            alert('Salvo com sucesso.');
            return;
        } catch (error) {
            alert(error)
            return;
        }

    } else {
        try {
            pokemon.add(name.value, [type1.value]);
            alert('Salvo com sucesso.');
            return;
        } catch (error) {
            alert(error);
            return;
        }

    }

})