/************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados 
 * Data: 17/04/2025
 * Autor: Lara Machado
 * Versão: 1.0
 **************************************************************/



//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir um novo artista no banco de dados
const insertArtista = async function(artista){
    try {
        let sql = `insert into tbl_artista(
                                            nome,
                                            biografia
                                            )
                                      values(
                                             '${artista.nome}',
                                             '${artista.biografia}'
                                             )`
                                             
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

//função para atualizar um artista existente no banco de dados
const updateArtista = async function(artista){
    try {
        let sql = `update tbl_artista set nome= '${artista.nome}',
                                            biografia= '${artista.biografia}'
                                        where id=${artista.id}`
                        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const updateUsuario = async function(usuario){
    try {
        let sql = `update tbl_usuario set nome = '${usuario.nome}',
                                          email = '${usuario.email}',
                                          senha = '${usuario.senha}',
                                          foto_perfil= '${usuario.foto_perfil}'
                                where id=${usuario.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

        } catch (error) {
            return false
        }
}


//função para excluir uma artista existente no banco de dados
const deleteArtista = async function(id){
    try {
        let sql = `delete from tbl_artista where id=${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}


//função para retornar todos os usuarios do banco de dados
const selectAllArtista = async function(){
    try {
        let sql = `SELECT * FROM tbl_artista ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        // Retorna os dados reais em vez de "true"
        if (result && result.length > 0)
            return result
        else
            return [] // retorna lista vazia

    } catch (error) {
        console.error(error)
        return false
    }
}

//função para listar um artista pelo ID no banco de dados
const selectByIdArtista = async function(id){
    try {
        let sql = `SELECT * FROM tbl_artista WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        // Retorne os dados encontrados
        if(result && result.length > 0)
            return result[0] // Se espera só 1 artista
        else
            return null // nenhum artista encontrado

    } catch (error) {
        console.error("Erro no DAO selectByIdArtista:", error)
        return false
    }
}


module.exports = {
    insertArtista,
    updateArtista,
    deleteArtista,
    selectAllArtista,
    selectByIdArtista
}