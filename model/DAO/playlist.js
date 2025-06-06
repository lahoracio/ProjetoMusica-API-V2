/************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados 
 * Data: 08/05/2025
 * Autor: Lara Machado
 * Versão: 1.0
 **************************************************************/



// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

const insertPlaylist = async function(playlist) {
    try {
        let sql = `insert into tbl_playlist (nome,
                                            qnt_musicas,
                                            data_criacao,
                                            capa,
                                            id_usuario)
                                values ('${playlist.nome}',
                                        '${playlist.qnt_musicas}',
                                        '${playlist.data_criacao}',
                                        '${playlist.capa}',
                                        '${playlist.id_usuario}')`

        // Executa o scipt SQL no BD e aguarda o resultado (true ou false)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else 
            return false // BUG no BD

    } catch (error) {
        return false // BUG de Programação         
    }
}

const updatePlaylist = async function(playlist) {
    try {
        
        let sql = `update tbl_playlist set nome            = '${playlist.nome}',
                                           qnt_musicas     = '${playlist.qnt_musicas}',
                                           data_criacao    = '${playlist.data_criacao}',
                                           capa            = '${playlist.capa}',
                                           id_usuario      = '${playlist.id_usuario}'
                                    where id_playlist      =  ${playlist.id_playlist}`
                                        
        let result = await prisma.$executeRawUnsafe(sql) // Usamos o exedute porque não vai retornar dados 
        
        if (result)
            return true
        else
            return false
                                                                    
    } catch (error) {
        console.log(error)
        return false
    }
}

const deletePlaylist = async function(number) {
    try {
        let id = number 

        let sql = `delete from tbl_playlist where id_playlist=${id}`

        // Encaminha o Script SQL para o BD
        let result = await prisma.$executeRawUnsafe(sql) // O delete não volta dados, por isso utiliza o execute 
        
        if(result)
            return true // Não retorna dados só true 
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllPlaylist = async function() {
    try {
        let sql = 'select * from tbl_playlist'

        // Encaminha o Script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdPlaylist = async function(number) {
    try {
        let id = number 
        
        let sql = `select * from tbl_playlist where id_playlist=${id} `

        // Encaminha o Script SQL para o BD
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
    insertPlaylist,
    updatePlaylist,
    deletePlaylist,
    selectAllPlaylist,
    selectByIdPlaylist
}