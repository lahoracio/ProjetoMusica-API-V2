/*************************************************************************************************
 *Objetivo: Colocando em pratica o conteudo aprendido na aula de Back-End (CRUD, Validações...)
 *Data: 17/04/2025
 *Autor: Lara
 *Versão: 1.0
**************************************************************************************************/

//import do arquivo de mensagens e status code 
const MESSAGE = require ('../../modulo/config.js')

//Importar do arquivo DAO musica para manipular o crud 
const artistaDAO= require ('../../model/DAO/artista.js')


const { json } = require('body-parser')

//funcao pra inserir um novo artista
const inserirArtista = async function(artista, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                artista.nome == undefined || artista.nome == '' || artista.nome == null || artista.nome.length > 80 ||
                artista.biografia == undefined ||  artista.biografia.length > 80
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultArtista = await artistaDAO.insertArtista(artista)
                console.log (artista)
                if(resultArtista)
                    return MESSAGE.SUCESS_CREATED_ITEM //201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarArtista = async function(){
    try {
        let dadosArtista = {}

        //chamar a função que retorna os artistas
        let resultArtista = await artistaDAO.selectAllArtista()

        if(resultArtista != false || typeof(resultArtista) == 'object')
        {
            //criando um objeto JSON para retornar a lista de usuarios
            if(resultArtista.length > 0){
                dadosArtista.status = true
                dadosArtista.status_code = 200
                dadosArtista.item = resultArtista.length
                dadosArtista.artista = resultArtista
                return dadosArtista //200
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

//função para listar um usuario pelo ID
const buscarArtista = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosArtista = {}
            let resultArtista = await artistaDAO.selectByIdArtista(id)

            if(resultArtista !== false && typeof(resultArtista) === 'object'){
                if(resultArtista != null){
                    dadosArtista.status = true
                    dadosArtista.status_code = 200
                    dadosArtista.artista = resultArtista
                    return dadosArtista //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para excluir um artista existente
const excluirArtista = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            //validar se o id existe
            let resultArtista = await buscarArtista(id)

            if(resultArtista.status_code == 200){
                //delete
                let result = await artistaDAO.deleteArtista(id)
                if(result){
                    return MESSAGE.SUCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultArtista.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para atualizar um artista existente
const atualizarArtista = async function(artista, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                artista.nome == undefined || artista.nome == '' || artista.nome == null || artista.nome.length > 80 ||
                artista.biografia == undefined ||  artista.biografia.length > 80
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultArtista = await buscarArtista(id)

                if(resultArtista && resultArtista.status_code == 200){
                    artista.id = id
                    let result = await artistaDAO.updateArtista(artista)
                
                    if(result){
                        return MESSAGE.SUCESS_UPDATE_ITEM //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else if(resultArtista && resultArtista.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                } else {
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

module.exports = {
    inserirArtista,
    listarArtista,
    buscarArtista,
    atualizarArtista,
    excluirArtista
}