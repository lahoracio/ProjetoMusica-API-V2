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
     const controllerMusica = require('./controller/musica/controllerMusica.js')

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
         //Recebe os dados encaminhados no body da requisição
        let dadosBody = request.body

        let result = await controllerMusica.inserirMusica(dadosBody)

        response.status(result.status_code)
        response.json(result)


     })

    app.listen(8080, function (){
        console.log('Servidor aguardando novas requisições...')
    })
