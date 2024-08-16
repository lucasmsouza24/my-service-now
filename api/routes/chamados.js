import ChamadosDB from '../database/ChamadosDB.js'

async function chamadosRoutes(fastify, options) {
    const db = new ChamadosDB()

    function getDateNow() {
        let now = new Date()
        now.setHours(now.getHours() - 3);
        return now.toISOString().slice(0, 16);
    }

    // retorna lista de chamados
    fastify.get('/chamados', async (request, reply) => {

        let status = request.query.status

        if (status) {
            status = status.replace('_', ' ')
            const chamadosByStatus = await(db.listItemsByStatus(status))
            return reply.status(200).send(chamadosByStatus)
        } else {
            const chamados = await db.listAllItems()
            return reply.status(200).send(chamados);
        }
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

        let now = getDateNow()

        const chamado = {
            ...request.body, 
            data_abertura: now,
            data_encerramento: null,
            comentarios: []
        }

        const res = await db.insertItem(chamado);

        if (res) {
            return reply.status(201).send(chamado)
        } else {
            return reply.status(400).send({
                text: 'Erro ao inserir objeto'
            })
        }
    })

    // atualiza chamado
    fastify.put('/chamados/:id', async (request, reply) => {

        const id = request.params.id
        const chamado_atual = await db.getChamadoById(id)

        if (chamado_atual.status === 'Finalizado') {
            return reply.status(409).send({
                text: `O chamado ${id} já está finalizado e não pode ser alterado.`
            })
        }

        const novos_valores = request.body

        const novo_comentario = {text: novos_valores.novoComentario, datetime: getDateNow()}
        const lista_comentarios = chamado_atual.comentarios
        lista_comentarios.push(novo_comentario)

        const valores_atualizado = {
            ...chamado_atual,
            categoria: novos_valores.categoria,
            prioridade: novos_valores.prioridade,
            status: novos_valores.status,
            comentarios: lista_comentarios,
            data_encerramento: novos_valores.status === 'Finalizado' ? getDateNow() : null
        }

        try {
            const updatedValues = await db.insertItem(valores_atualizado)
            return reply.status(200).send({
                text: `chamado ${request.params.id} atualizado com sucesso.`
            })
        } catch (err) {
            console.log(err)
            return reply.status(400).send({
                text: 'não foi possível atualizar o chamado'
            })
        }

    })

    // get next id
    fastify.get('/chamados/next', async (request, reply) => {
        
        try {
            const count = await db.count()

            if (count === 0) {
                return reply.status(200).send({
                    next_id: 'INC000001'
                })
            }
            else if (count) {
                const num = count + 1;
                const str = num.toString().padStart(6, '0')
                const next_id = `INC` + str
                return reply.status(200).send({
                    next_id
                })
            } else {
                return reply.status(400).send({
                    text: 'count error'
                })
            }
        } catch (err) {
            console.warning(err)
        }
    })
}

export default chamadosRoutes;