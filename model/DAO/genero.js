/************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados 
 * Data: 17/04/2025
 * Autor: Lara Machado
 * Versão: 1.0
 **************************************************************/




// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

//funcao para inserir um genero no bando de dados
const insertGenero = async function(genero){
    try {
        let sql = `insert into tbl_genero(
                                            genero
                                            )
                                      values(
                                             '${genero.genero}'
                                             )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false

    } catch (error) {
        console.log(error);
        
        return false
    }
}

//função para atualizar um genero existente no banco de dados
const updateGenero = async function(genero){
    try {
        let sql = `update tbl_genero set genero= '${genero.genero}'
                                        where id=${genero.id}`
                        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir um genero existente no banco de dados
const deleteGenero = async function(id){
    try {
        //script sql
        let sql = 'delete from tbl_genero where id='+id

        //executa o script
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todas as genero do banco de dados
const selectAllGenero = async function(){
    try {
        let sql = 'select * from tbl_genero order by id desc'

        //executa o script sql no db e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//função para listar um genero pelo ID no banco de dados
const selectByIdGenero = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_genero where id='+id

        //executa o script
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}