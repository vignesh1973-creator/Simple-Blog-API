import swaggerJsDoc from 'swagger-jsdoc';


const options : swaggerJsDoc.Options = {
    definition:{
        openapi: '3.0.0',
        info:{
            title:"Simple Blog API",
            version:'1.0.0',
            description:'A simple blog API built with express and mongoose using TypeScript'
        },
        servers:[{url : 'http://localhost:3000'}],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:'http',
                    scheme:'bearer',
                    bearerFormat:'JWT'
                }
            }
        },
        security:[{bearerAuth:[]}]
    },
    apis:['src/routes/*.ts'],
}


const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;