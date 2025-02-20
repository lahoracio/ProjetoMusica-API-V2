/************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados 
 * Data: 13/02/2025
 * Autor: Lara Machado
 * Versão: 1.0
 **************************************************************/

//Import da biblioteca do prisma/Client
const {PrismaClient} = require('@prisma/client')


//Função para inserir uma nova musica no banco de dados
const insertMusica = async function(){
     //instanciando (criar novo objeto) para realizar a manipulação do spript SQL
    const prisma = new PrismaClient() 

    let sql = `insert into tbl_musica (nome,
                                        link,
                                        duracao,
                                        data_lancamento
                                        foto_capa,
                                        letra
                                      )
                                values( 
                                            '${musica.nome}',
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
}

//função para atualizar uma musica existente no banco de dados
const updateMusica = async function(){

}

//função para excluir uma musica existente no banco de dados
const deleteMusica = async function(){

}

// Função para retornar todas as musicas do banco de dados
const selectAllMusica = async function(){

}

// Função para buscar uma musica pelo ID no banco de dados
const selectByIdMusica = async function(){

}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}