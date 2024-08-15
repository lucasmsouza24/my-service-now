import {fastify} from 'fastify';
import chamadosRoutes from './routes/chamados.js';


const server = fastify()

server.get('/', () => {
    return {hello: 'world'}
})

server.register(chamadosRoutes)

server.listen({ port: 3333 }, (err, address) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:3333`);
})