// import do arquivo de configurações de mensagens de status 
const MENSAGE = require('../../modulo/config.js')

const musicaDAO = require('../../model/DAO/musica.js')
//Importar do arquivo DAO musica para manipular 

// Função para inserir uma musica para manipular o Bd
const inserirMusica = async function(musica, contentType){

    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
        
    
            if (musica.nome            ==       undefined    ||    musica.nome              == '' || musica.nome               == null      || musica.nome.length             > 80  ||
                musica.duracao         ==       undefined    ||    musica.duracao           == '' || musica.duracao            == null      || musica.duracao.length          > 5   ||
                musica.data_lancamento ==       undefined    ||    musica.data_lancamento   == '' || musica.data_lancamento    == null      || musica.data_lancamento.length  > 10  ||
                musica.foto_capa       ==       undefined    ||    musica.foto_capa.length  > 200 ||
                musica.letra           ==       undefined    
            ){
                return MENSAGE.ERROR_REQUIRE_FIEDLS 
            }else{
                let resultMusica = await musicaDAO.insertMusica(musica)

                if(resultMusica)
                    return MENSAGE.SUCESS_CREATED_ITEM//201
                else 
                    return MENSAGE.ERROR_REQUIRE_SEVER_MODEL //500
            
            }
        }else{
            return MENSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
        
    }
}
// Função para atualizar uma musica
const atualizarMusica = async function(musica, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            
                if (musica.nome            ==       undefined    ||    musica.nome              == '' || musica.nome               == null      || musica.nome.length             > 80  ||
                    musica.duracao         ==       undefined    ||    musica.duracao           == '' || musica.duracao            == null      || musica.duracao.length          > 5   ||
                    musica.data_lancamento ==       undefined    ||    musica.data_lancamento   == '' || musica.data_lancamento    == null      || musica.data_lancamento.length  > 10  ||
                    musica.foto_capa       ==       undefined    ||    musica.foto_capa.length  > 200 ||
                    musica.letra           ==       undefined    ||
                    id == '' || id == undefined || id == null || isNaN(id) ||id <=0
                ){
                    return MENSAGE.ERROR_REQUIRE_FIEDLS //400
                }else{
                    //validar se o ID existe no banco 
                    let resultMusica = await buscarMusica(id)
                    if(resultMusica.status_code == 200){
                        //update
                        //adiciona o atributo ID no JSON e coloca o ID da musica que chegou na controller
                        musica.id = id
                        let result = await musicaDAO.updateMusica(musica)

                        if(result){
                            return MENSAGE.SUCESS_CREATED_ITEM//200
                        }else{
                            return MENSAGE.ERROR_INTERNAL_SEVER_MODEL //500
                        }

                    }else if(resultMusica.status_code == 404){
                        return MENSAGE.ERROR_NOT_FOUND //404
                    }else{
                        return MENSAGE.ERROR_INTERNAL_SEVER_CONTROLLER //500
                    }

                }
        }else{
            return MENSAGE.ERROR_CONTENT_TYPE //415
        }
        
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SEVER_CONTROLLER //500
        
    }
    
}
// Função para excluir uma musica   
const excluirMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) ||id <=0){
            return MENSAGE.ERROR_REQUIRE_FIEDLS //400
        }else{
            //validar se o id existe
            let resultMusica = await buscarMusica(id)

            if(resultMusica.status_code == 200){
                //Delete
                let result = await musicaDAO.deleteMusica(id)
                
                if(result){
                    return MENSAGE.SUCESS_DELETED_ITEM //200
                }else {
                    return MENSAGE.ERROR_INTERNAL_SEVER_MODEL //500
                }

            }else if(resultMusica.status_code == 404){
                return MENSAGE.ERROR_NOT_FOUND //404
            }else{
                return MENSAGE.ERROR_INTERNAL_SEVER_CONTROLLER
            }

        }
        
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SEVER_CONTROLLER //500
        
    }
    
}
// Função para retornar todas as musica
const listarMusica = async function(){
    try {

        let dadosMusica = {}
         //Chamar a função que retorna todas as musicas
        let resultMusica = await musicaDAO.selectAllMusica()

        if(resultMusica != false || typeof(resultMusica) == 'object') 
        {
            if(resultMusica.length > 0){
            
                //Criando um objeto JSON para retornar a lista de musicas
                dadosMusica.status = true
                dadosMusica.status_code = 200
                dadosMusica.items = resultMusica.length
                dadosMusica.musics = resultMusica

                return dadosMusica //200
            }else{
                return MENSAGE.ERROR_NOT_FOUND//404
            }

            }else{
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
    }catch (error){
        return MENSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}  
    
   

// Função para retornar uma musica pelo ID
const buscarMusica = async function(id){

    try {
        if(id == '' || id == undefined || id == null || isNaN(id) ||id <=0){
            return MENSAGE.ERROR_REQUIRE_FIEDLS //400
        }else{
            let dadosMusica = {}
            //chama a função para retornar od dados da musica
            let resultMusica = await musicaDAO.selectByIdMusica(id)
            if (resultMusica !=false || typeof(resultMusica) == 'object'){
                if (resultMusica.length > 0){
                    //cria um objeto do tipo JSON para retornar a lista de musicas 
                    dadosMusica.status = true
                    dadosMusica.status_code = 200
                    dadosMusica.musics = resultMusica
                    return dadosMusica//200
                }else{
                    return MENSAGE.ERROR_NOT_FOUND//404
                }
            }else{
                return MENSAGE.ERROR_INTERNAL_SEVER_MODEL//500
            }
        }
    }catch(error){
         return MENSAGE.ERROR_INTERNAL_SEVER_CONTROLLER //500
    }

    }
module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}