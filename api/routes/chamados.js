import ChamadosDB from '../database/ChamadosDB.js'

async function chamadosRoutes(fastify, options) {
    const db = new ChamadosDB()

    // retorna lista de chamados
    fastify.get('/chamados', async (request, reply) => {
        const chamados = await db.listAllItems()
        return chamados;
    });

    // retorna um chamado em específico
    fastify.get('/chamados/:id', async (request, reply) => {
        const numero_chamado = request.params.id;
        const chamado = await db.getChamadoById(numero_chamado)

        if (chamado) {
            return reply.status(200).send(chamado)
        } else {
            return reply.status(404).send({
                status: 404,
                numero_chamado,
                text: `O chamado ${numero_chamado} não existe.`,
                type: 'Error'
            })
        }
    })

    // cria chamado
    fastify.post('/chamados', async (request, reply) => {
        const chamado = request.body
        
        console.log('Criando chamado')
        console.log(body)

        return reply.status(201).send({
            chamado: 'INC1209831',
            texto: `chamado INC1209831 criado com sucesso`
        })
    })

    // atualiza chamado
    fastify.put('/chamados/:id', async (request, reply) => {
        return reply.status(200).send({
            text: 'chamado INC12379 atualizado'
        })
    })
}

export default chamadosRoutes;