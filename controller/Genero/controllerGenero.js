/*************************************************************************************************
 *Objetivo: Colocando em pratica o conteudo aprendido na aula de Back-End (CRUD, Validações...)
 *Data: 17/04/2025
 *Autor: Lara
 *Versão: 1.0
**************************************************************************************************/

//import do arquivo de mensagens e status code 
const MESSAGE = require ('../../modulo/config.js')

//Importar do arquivo DAO musica para manipular o crud 
const generoDAO = require ('../../model/DAO/genero.js')

//funcao pra inserir um novo genero
const inserirGenero = async function(genero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                genero.genero == undefined || genero.genero == '' || genero.genero == null || genero.genero.length > 50
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultGenero = await generoDAO.insertGenero(genero)

                if(resultGenero)
                    return MESSAGE.SUCESS_CREATED_ITEM //201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.log(error);
        
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//funcao pra listar todos as genero
const listarGenero = async function(){
    try {
        let dadosGenero = {}

        //chamar a função que retorna os artistas
        let resultGenero = await generoDAO.selectAllGenero()

        if(resultGenero != false || typeof(resultGenero) == 'object')
        {
            //criando um objeto JSON para retornar a lista de Generos
            if(resultGenero.length > 0){
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.item = resultGenero.length
                dadosGenero.genero = resultGenero
                return dadosGenero //200
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para listar uma Genero pelo ID
const buscarGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosGenero = {}
            let resultGenero = await generoDAO.selectByIdGenero(id)

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){
                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    dadosGenero.genero = resultGenero
                    return dadosGenero //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para atualizar uma Genero existente
const atualizarGenero = async function(genero, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                genero.genero == undefined || genero.genero == '' || genero.genero == null || genero.genero.length > 50 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultGenero = await buscarGenero(id)

                if(resultGenero.status_code == 200){
                    //update
                    genero.id = id //adiciona o atributo id no json e e coloca o id da Genero que chegou na controller
                    let result = await generoDAO.updateGenero(genero)

                    if(result){
                        return MESSAGE.SUCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultGenero.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para excluir uma Genero existente
const excluirGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            //validar se o id existe
            let resultGenero = await buscarGenero(id)

            if(resultGenero.status_code == 200){
                //delete
                let result = await generoDAO.deleteGenero(id)
                if(result){
                    return MESSAGE.SUCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultGenero.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        console.log(error);
        
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirGenero,
    listarGenero,
    buscarGenero,
    atualizarGenero,
    excluirGenero
}