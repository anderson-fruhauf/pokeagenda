const fs = require('fs'); 

class Pokemon{

    constructor(){
        this.pokemons = [];

        const fileBuffer = fs.readFileSync('./file/data/data.json', 'utf-8')
        const contentJson = JSON.parse(fileBuffer);

        this.pokemons = contentJson;
    }

    save(){
        fs.writeFile('./file/data/data.json', JSON.stringify(this.pokemons), function(err){
            if(err){
                console.log(err)
            }
        });
    }

    list(inicio, fim){
        if(inicio && fim && inicio < fim && fim <= this.pokemons.length && inicio > 0 ){
            let lista = [];
            for(inicio; inicio < fim; inicio++){
                lista.push(this.pokemons[inicio]);
            }
            return lista;
        }else{
            throw Error('parametros de listagem invalidos');
            
        }
        
    }

    add(name, type){
        if(name && type && typeof type != "boolean" && typeof name != "boolean"){
            if(this.getName(name) != null){
                throw Error('pokemon ja cadastrado. Não é possivel realizar um novo cadastro.')
            }
            if(Array.isArray(type)){
                let pokemon = new pokemonModel(name, type);
                this.pokemons.push(pokemon);
                this.save();
                return pokemon;
            }
            let pokemon = new pokemonModel(name, type);
            this.pokemons.push(pokemon);
            this.save();
            return pokemon;
        }
        throw Error('parametros invalidos')  
    }

    getName(name){
        let lista = this.list(1 , this.pokemons.length);
        let contain = false
        for(let i=0; i<lista.length; i++){
            if(lista[i].name == name){
                return lista[i];
            }
        }
        return null;
    }

    get(i){
        return this.pokemons[i]
    }

    remove(name){
        if(typeof name == "string" && name.length > 2){
            let retorno = this.getName(name);
            if(retorno){
                this.pokemons.splice(this.pokemons.indexOf(retorno), 1);
                this.save();
                return retorno;
            }
            return null;
        }
        throw Error("parametro invalido");
    }

    count(){
        return this.pokemons.length;
    }

    countType(type){
        let contador = 0;
        for(let i =0; i<this.pokemons.length;i++){
            if(this.pokemons[i].type.indexOf(type) > -1){
                contador ++;
            }
        }
        return contador;
    }

    indexOf(pokemon){
        if(pokemon){
            return this.pokemons.indexOf(pokemon);
        }
    }

}

class pokemonModel{
    constructor(name, types){
        if(name || types){
            if(Array.isArray(types)){
                this.name = name;
                this.type = types;
            }else{
                this.name = name;
                this.type = [types];
            }
        }else{
           throw Error('não foi possuvel constrir a classe, parametros errados') 
        }

    }
}

module.exports = Pokemon;