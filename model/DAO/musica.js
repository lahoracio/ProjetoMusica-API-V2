/************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados 
 * Data: 13/02/2025
 * Autor: Lara Machado
 * Versão: 1.0
 **************************************************************/

//Import da biblioteca do prisma/Client
const {PrismaClient} = require('@prisma/client')

//instanciando (criar novo objeto) para realizar a manipulação do spript SQL
const prisma = new PrismaClient() 


//Função para inserir uma nova musica no banco de dados
const insertMusica = async function(musica){
    
    try {
        

        let sql = `insert into tbl_musica (nome,
                                        duracao,
                                        data_lancamento,
                                        foto_capa,
                                        letra
                                      )
                                values( 
                                            '${musica.nome},

                                            '${musica.duracao}',
                                            '${musica.data_lancamento}',
                                            '${musica.foto_capa}',
                                            '${musica.letra}'
                                        )`
                                        

        // Executa o spript SQL no BD e aguarde o retorno do BD                                        
        let result = await prisma.$executeRawUnsafe(sql)  
     
        if (result)
            return true
        else
         return false

    } catch (error) {
        return false
    }


}

//função para atualizar uma musica existente no banco de dados
const updateMusica = async function(musica){
    try {
        let sql = `update tbl_musica set nome =  '${musica.nome}',
                                        duracao = '${musica.duracao}',
                                        data_lancamento = '${musica.data_lancamento}',
                                        foto_capa = '${musica.foto_capa}',
                                        letra = '${musica.letra}'
                            where id=${musica.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else 
            return false
    } catch (error) { 
        return false
        
    }

}

//função para excluir uma musica existente no banco de dados
const deleteMusica = async function(id){
    try {
        //Script Sql 
        let sql = 'delete from tbl_musica where id=' +id

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }

}

// Função para retornar todas as musicas do banco de dados
const selectAllMusica = async function(){
    try {
        //Script Sql
        let sql = 'select * from tbl_musica order by id desc'
        //Executa o script SQL no Banco de dados e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
        
    }
}

// Função para buscar uma musica pelo ID no banco de dados
const selectByIdMusica = async function(id){
    try {
        //Script Sql 
        let sql = 'select * from tbl_musica where id=' +id

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }

}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}