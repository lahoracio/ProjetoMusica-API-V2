/*************************************************************************************************
 *Objetivo: Colocando em pratica o conteudo aprendido na aula de Back-End (CRUD, Validações...)
 *Data: 17/04/2025
 *Autor: Lara
 *Versão: 1.0
**************************************************************************************************/

//import do arquivo de mensagens e status code 
const message = require ('../../modulo/config.js')

//Importar do arquivo DAO musica para manipular o crud 
const usuarioDAO = require ('../../model/DAO/usuario.js')

// Função para inserir um usuario para manipular o Bd
const inserirUsuario = async function(usuario, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if (usuario.nome      == ''        || usuario.nome       == null || usuario.nome       == undefined || usuario.nome.length         > 80 || 
                usuario.email          == ''        || usuario.email          == null || usuario.email          == undefined || usuario.email.length            > 80 ||
                usuario.senha          == ''        || usuario.senha          == null || usuario.senha          == undefined || usuario.senha.length            > 45 ||
                usuario.foto_perfil           == undefined || usuario.foto_perfil.length   > 80
            )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else{
                //encaminhando os dados da música para o DAO realizar o insert no Banco de dados 
                let resultUsuario = await usuarioDAO.insertUsuario(usuario)

                if(resultUsuario)
                    return message.SUCESS_CREATED_ITEM //status code 201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //status code 500 
            }
        }else{
            return message.ERROR_CONTENT_TYPE //status code 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // status code 500 
    }
}



const atualizarUsuario = async function(usuario, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                usuario.nome      == ''        || usuario.nome       == null || usuario.nome       == undefined || usuario.nome.length         > 80 || 
                    usuario.email          == ''        || usuario.email          == null || usuario.email          == undefined || usuario.email.length            > 80 ||
                    usuario.senha          == ''        || usuario.senha          == null || usuario.senha          == undefined || usuario.senha.length            > 45 ||
                    usuario.foto_perfil           == undefined || usuario.foto_perfil.length   > 80
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultUsuario = await buscarUsuario(id)

                if(resultUsuario.status_code == 200){
                    //update
                    usuario.id = id //adiciona o atributo id no json e e coloca o id da música que chegou na controller
                    let result = await usuarioDAO.updateUsuario(usuario)

                    if(result){
                        return message.SUCESS_UPDATE_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultUsuario.status_code == 404){
                    return message.ERROR_NOT_FOUND //404
                }else{
                    return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



// Função para excluir um usuário
const excluirUsuario = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            
            // Antes de excluir, estamos verificando se existe esse id 
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){

                if(resultUsuario.length > 0){

                    // Chama a função para retornar as músicas do banco de dados
                    let result = await usuarioDAO.deleteUsuario(id)
                    
                    if(result)
                        return message.SUCESS_DELETED_ITEM // 200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500

                }else{
                    return message.ERROR_NOT_FOUND // 404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
            }
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}



//Função para listar todos os usuários
const listarUsuario = async function() {
    try {
        // Objeto JSON 
        let dadosUsuario = {}

        //Chama a função da model 
        let resultUsuario = await usuarioDAO.selectAllUsuario()

        if(resultUsuario != false || typeof(resultUsuario) == 'object'){
            if(resultUsuario.length > 0){
                // Coloca os dados no JSON para depois retornar 
                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.items = resultUsuario.length
                dadosUsuario.users = resultUsuario

                return dadosUsuario
            }else{
                return message.ERROR_NOT_FOUND // 404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL // 500 
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 
    }
}

// Função para retornar um usuario pelo ID
const buscarUsuario = async function(numero) {
    try {
        let id = numero

        
        let dadosUsuario = {}

        
        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400

        }else{

           //chama a função para retornar os dados do usuario
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                    dadosUsuario.status = true
                    dadosUsuario.status_code = 200,
                    dadosUsuario.user = resultUsuario

                    return dadosUsuario
                }else{
                    return message.ERROR_NOT_FOUND // 404
                }

            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}