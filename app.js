/************************************************************
 * Objetivo: Api responsavel pela reposições de projeto de musica 
 * Data: 13/02/2025
 * Autor: Lara Machado
 * Versão: 1.0
 ************Obsrvações: Para criar a api precisamos instalar:
 * express               npm install express --save 
 * cors                  npm install cors --save 
 * body-parser           npm install body-parser --save
 
 ************Para criar a conexão com o banco de dados Mysql precisamos instalar :
 * prisma              npm install prisma --save 
 * prisma/cliente      npm install @prisma/client --save
 * 
 * 
 * apos a instalação é nessario inicializar o prisma 
     npx prisma init

 * para sincronizar o prisma com o banco de dados com o banco podemos utlizar o 
     npx prisma migrate dev  
 **************************************************************************/

     const express = require('express')
     const cors = require('cors')
     const bodyParser = require('body-parser')
     
     //Import das controllers do projeto
     const controllerMusica = require('./controller/Musica/controllerMusica.js')

     //Criando o formato de dados que sera recebido no body da requisição (POST/PUT)
     const bodyParserJSON = bodyParser.json() 
     
     //Cria o objeto app para criar a api
     const app = express()
     
     //Cria configração do CORS
     app.use((request,response,next)=>{
         response.header('Access-Control-Allow-Origin','*')
         response.header('Access-Control-Allow','GET , POST, PUT, DELETE, OPTION')
     
         app.use (cors())
         next()
     })


     //EndPoint para inserir uma musica
     app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function(request, response) {

        //Recebe contentType da requisição para validar formato de dados
        let contentType = request.headers['content-type']
         //Recebe os dados encaminhados no body da requisição
        let dadosBody = request.body

        let result = await controllerMusica.inserirMusica(dadosBody, contentType)

        response.status(result.status_code)
        response.json(result)


     })

    //EndPoint para retornar uma lista de musicas
    app.get('/v1/controle-musicas/musica', cors(), async function (request, response) {
        //Chama função para retornar lista de musica
        let result = await controllerMusica.listarMusica()

        response.status(result.status_code)
        response.json(result)
        
    } )

    //sempre quando chegra no id precisa ser como parametro para a pessoa digitar
    //endpoint para buscar pelo ID
    app.get('/v1/controle-musicas/musica/:id', cors(), async function (request, response) {
        let idMusica = request.params.id
        let result = await controllerMusica.buscarMusica(idMusica)
        
        response.status(result.status_code)
        response.json(result)
    })

        //endpoint para excluir uma musica
    app.delete('/v1/controle-musicas/musica/:id',  cors(), async function (request, response){
        let idMusica = request.params.id
        let result = await controllerMusica.excluirMusica(idMusica)
        response.status(result.status_code)
        response.json(result)
    })

        //endpoint de atualizar as musicas
    app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function (request, response){
        //recebe o content-type da requisição
        let contentType = request.headers['content-type']
        //recebe o id da música
        let idMusica = request.params.id
        //recebe os dados do body
        let dadosBody = request.body

        let result = await controllerMusica.atualizarMusica(dadosBody, idMusica, contentType)
        response.status(result.status_code)
        response.json(result)

    })


    /********************************************************************
     * Criando mais Endpoints para o projeto 
     * Autor: Lara Machado 
     * Data: 17/04/2025
     * TABELA USUARIO
     * 
     ********************************************************************/

    // Import das Controller do projeto 
const controllerUsuario = require('./controller/Usuario/controllerUsuario.js')

/***************
 * INSERIR USUARIO
 *************/

app.post('/v1/controle-musicas/usuario', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe os dados do body da requisição 
    let dadosBody = request.body 

    
    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

     
    response.status(resultUsuario.status_code)
    response.json(resultUsuario)

})

/***************
 * LISTAR USUARIOS
 *************/

app.get('/v1/controle-musicas/usuarios', cors(), async function(request, response){
    
    let resultUsuario = await controllerUsuario.listarUsuario()
    
    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

/***************
 * BUSCAR USUARIO PELO ID
 *************/

app.get('/v1/controle-musicas/usuario-id/:id', cors(), async function(request, response){

    //Pegando o ID via params
    let id = request.params.id

    // Chama a função e manda o id
    let resultUsuario = await controllerUsuario.buscarUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

/***************
 * DELETAR USUARIO PELO ID- ARRUMAR ESSE
 *************/

app.delete('/v1/controle-musicas/deletar-usuario/:id', cors(), async function(request, response){
    
    //Sempre que for buscar pelo ID é por params 
    let id= request.params.id

    let resultUsuario = await controllerUsuario.excluirUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//Endpoint para atualizar usuário pelo ID
app.put('/v1/controle-musicas/atualizar-usuario/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe o ID do usuário
    let idUser = request.params.id

    // Recebe os dados da requisição 
    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultUsuario = await controllerUsuario.atualizarUsuario(idUser, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.listen(8080, function (){
    console.log('Servidor aguardando novas requisições...')
})
