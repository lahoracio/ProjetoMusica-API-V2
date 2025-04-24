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


// Função para inserir nova música
const insertUsuario = async function(usuario) {
    try {
        let sql = `insert into tbl_usuario ( nome,
                                            email, 
                                            senha,  
                                            foto_perfil)
                                values ('${usuario.nome}',
                                        '${usuario.email}',
                                        '${usuario.senha}',
                                        '${usuario.foto_perfil}')`


        // Executa o script SQL no BD e aguarda o resultado 
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else 
            return false 

    } catch (error) {
        return false      
    }
}

//função para atualizar um usuário existente no banco de dados
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

// Função para excluir música existente 
const deleteUsuario = async function(number) {
    try {
        
        let id = number 

       
        let sql = `delete from tbl_usuario where id=${id}`

        // Encaminha o Script SQL para o BD
        let result = await prisma.$executeRawUnsafe(sql) 
        
        if(result)
            return true 
        else
            return false

    } catch (error) {
        return false
    }
}

// Função para retornar todos os usuários do BD
const selectAllUsuario = async function() {
    try {
        // Script SQL 
        let sql = 'select * from tbl_usuario'

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

//Função para selecionar usuário buscando pelo ID
const selectByIdUsuario = async function(number) {
    try {
        
        let id = number 

        
        let sql = `select * from tbl_usuario where id=${id} `

        //Encaminha o script para o BD
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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}