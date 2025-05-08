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
 * DELETAR USUARIO PELO ID
 *************/

app.delete('/v1/controle-musicas/deletar-usuario/:id', cors(), async function(request, response){
    
    //Sempre que for buscar pelo ID é por params 
    let id= request.params.id

    let resultUsuario = await controllerUsuario.excluirUsuario(id)
    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

/***************
 * ATUALIZAR USUARIO PELO ID
 *************/

app.put('/v1/controle-musicas/usuario/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idUsuario = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario, contentType)

    response.status(result.status_code)
    response.json(result)
})

 /********************************************************************
     * Criando mais Endpoints para o projeto 
     * Autor: Lara Machado 
     * Data: 17/04/2025
     * TABELA GENERO
     * 
     ********************************************************************/

// Import das Controller do projeto 
const controllerGenero = require('./controller/Genero/controllerGenero.js')

//endpoint para inserir um genero
app.post('/v1/controle-musicas/genero', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de genero
app.get('/v1/controle-musicas/genero', cors(), async function(request, response){

    //chama a função para retornar uma lista de genero
    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um genero pelo id
app.get('/v1/controle-musicas/genero/:id', cors(), async function(request, response){

    let idGenero = request.params.id

    let result = await controllerGenero.buscarGenero(idGenero)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um Genero
app.put('/v1/controle-musicas/genero/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idGenero = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um Genero
app.delete('/v1/controle-musicas/genero/:id', cors(), async function(request, response){
    let idGenero = request.params.id

    let result = await controllerGenero.excluirGenero(idGenero)

    response.status(result.status_code)
    response.json(result)
})

 /********************************************************************
     * Criando mais Endpoints para o projeto 
     * Autor: Lara Machado 
     * Data: 17/04/2025
     * TABELA ARTISTA
     * 
     ********************************************************************/

// Import das Controller do projeto 
const controllerArtista = require('./controller/Artista/controllerArtista.js')

//endpoint para inserir um artista
app.post('/v1/controle-musicas/artista', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerArtista.inserirArtista(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de artista
app.get('/v1/controle-musicas/artista', cors(), async function(request, response){

    //chama a função para retornar uma lista de artista
    let result = await controllerArtista.listarArtista()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um artista pelo id
app.get('/v1/controle-musicas/artista/:id', cors(), async function(request, response){

    let idArtista = request.params.id

    let result = await controllerArtista.buscarArtista(idArtista)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um artista
app.put('/v1/controle-musicas/artista/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idArtista = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerArtista.atualizarArtista(dadosBody, idArtista, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um artista
app.delete('/v1/controle-musicas/artista/:id', cors(), async function(request, response){
    let idArtista = request.params.id

    let result = await controllerArtista.excluirArtista(idArtista)

    response.status(result.status_code)
    response.json(result)
})


 /********************************************************************
     * Criando mais Endpoints para o projeto 
     * Autor: Lara Machado 
     * Data: 17/04/2025
     * TABELA BANDA
     * 
     ********************************************************************/



 // Import das Controller do projeto 
const controllerBanda = require('./controller/Banda/controllerBanda.js')

//endpoint para inserir uma banda
app.post('/v1/controle-musicas/banda', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerBanda.inserirBanda(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de banda
app.get('/v1/controle-musicas/banda', cors(), async function(request, response){

    //chama a função para retornar uma lista de banda
    let result = await controllerBanda.listarBanda()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um banda pelo id
app.get('/v1/controle-musicas/banda/:id', cors(), async function(request, response){

    let idBanda = request.params.id

    let result = await controllerBanda.buscarBanda(idBanda)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um banda
app.put('/v1/controle-musicas/banda/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idBanda = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerBanda.atualizarBanda(dadosBody, idBanda, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um banda
app.delete('/v1/controle-musicas/banda/:id', cors(), async function(request, response){
    let idBanda = request.params.id

    let result = await controllerBanda.excluirBanda(idBanda)

    response.status(result.status_code)
    response.json(result)
})

 /********************************************************************
     * Criando mais Endpoints para o projeto 
     * Autor: Lara Machado 
     * Data: 17/04/2025
     * TABELA GRAVADORA
     * 
     ********************************************************************/

// Import das Controller do projeto 
const controllerGravadora = require('./controller/Gravadora/controllerGravadora.js')

//EndPoint para inserir uma gravadora  
app.post('/v1/controle-musicas/gravadora', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe os dados do body da requisição 
    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultGravadora = await controllerGravadora.inserirGravadora(dadosBody, contentType)

    // Resposta e status code 
    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

// Endpoint para listar todas as gravadoras
app.get('/v1/controle-musicas/gravadoras', cors(), async function(request, response){

    let resultGravadora = await controllerGravadora.listarGravadora()

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

//Endpoint buscar pelo ID
app.get('/v1/controle-musicas/gravadora/:id', cors(), async function(request, response){

    //Pegando o ID via params
    let id = request.params.id

    // Chama a função e manda o id
    let resultGravadora = await controllerGravadora.buscarGravadora(id)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

// Endpoint para deletar gravadora pelo ID
app.delete('/v1/controle-musicas/gravadora/:id', cors(), async function(request, response){
    
    //Sempre que for buscar pelo ID é por params 
    let id= request.params.id

    let resultGravadora = await controllerGravadora.excluirGravadora(id)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

//Endpoint para atualizar gravadora pelo ID
app.put('/v1/controle-musicas/gravadora/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let idGravadora = request.params.id

    // Recebe os dados da requisição 
    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultGravadora = await controllerGravadora.atualizarGravadora(idGravadora, dadosBody, contentType)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})



app.listen(8080, function (){
    console.log('Servidor aguardando novas requisições...')
})
