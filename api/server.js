import {fastify} from 'fastify';
import chamadosRoutes from './routes/chamados.js';
import cors from '@fastify/cors';



const server = fastify()

// Configurando CORS para permitir todas as origens
server.register(cors, { 
    origin: '*' // Permite qualquer origem
});

server.register(chamadosRoutes)

server.get('/', () => {
    return {hello: 'world'}
})

server.listen({ port: 3333 }, (err, address) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:3333`);
})