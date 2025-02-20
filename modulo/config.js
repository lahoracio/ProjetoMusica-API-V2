/******************************
 * Objetivo: Arquivo de configuração do projeto, onde teremos mensagens padronizadas, variaveis
 * Data: 13/02/2025
 * Autor:Lara Machado
 * Versão: 1.0
 ********************************************/

/********************************MENSAGENS DE STATUS CODE PARA API************************************************
/********************************MENSAGENS DE ERRO*****************************************************************/

const ERROR_REQUIRE_FIEDLS = {status: false, status_code: 400, message: 'Existem campos com preenchimento obrigatorio que não foram encaminhados'}
const ERROR_REQUIRE_SEVER = {status: false, status_code: 500, message: 'erro interno no servidor, não foi possivel processar a requisição'}

/********************************** MENSAGENS DE SUCESSO ********************************************************** */

const SUCESS_CREATED_ITEM = {status: true, status_code: 201, massage:'Item criado com sucesso'}

module.exports = {
    ERROR_REQUIRE_FIEDLS,
    ERROR_REQUIRE_SEVER,
    E

}  