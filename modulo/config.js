/******************************
 * Objetivo: Arquivo de configuração do projeto, onde teremos mensagens padronizadas, variaveis
 * Data: 13/02/2025
 * Autor:Lara Machado
 * Versão: 1.0
 ********************************************/

/********************************MENSAGENS DE STATUS CODE PARA API************************************************
/********************************MENSAGENS DE ERRO*****************************************************************/

const ERROR_REQUIRED_FIELDS = { status: false, status_code: 400, message: 'Existem campos com preenchimento obrigatorio que não foram encaminhados'}
const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'Devido a um erro interno no servidor de modelagem de dados, não foi possivel processar a requisição'}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'Devido a um erro interno no servidor, não foi possivel processar a requisição'}
const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'Não foi possivel processar a requisição, pois o tipo de dado encaminhado nao é aceito na API. Você deve encaminhar apenas JSON'}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados itens para retorno'}
/********************************** MENSAGENS DE SUCESSO ********************************************************** */

const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message:'Item criado com sucesso'}
const SUCESS_DELETED_ITEM = {status: true, status_code: 200, message:'Item excluido com sucesso'}
const SUCESS_UPDATE_ITEM = {status: true, status_code: 200, message:'Update feito com sucesso'}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCESS_DELETED_ITEM,
    SUCESS_UPDATE_ITEM
    

}  