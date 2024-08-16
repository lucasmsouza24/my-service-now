import { useEffect, useState } from 'react';
import SelectOption from '../../components/SelectOption';
import SimpleInputLabel from '../../components/SimpleInputLabel';
import './ViewIncident.css'
import ItemComentario from '../../components/ItemComentario';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ViewIncident() {

    const category_options = ['Rede', 'Software', 'Hardware'];
    const priority_options = ['Baixa', 'Média', 'Alta'];
    const status_options = ['Novo', 'Em andamento', 'Em espera', 'Finalizado'];

    // state
    const { id } = useParams();
    const [numeroChamado, setNumeroChamado] = useState(id);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [solicitante, setSolicitante] = useState('Lucas Mesquita');
    const [novoComentario, setNovoComentario] = useState('');
    const [listaComentarios, setListaComentarios] = useState([]);
    const [categoria, setCategoria] = useState()
    const [prioridade, setPrioridade] = useState()
    const [status, setStatus] = useState()

    // Obter a data atual no formato YYYY-MM-DD
    // const today = new Date().toISOString().split('T')[0];
    const [dataAbertura, setDataAbertura] = useState();
    const [encerramento, setEncerramento] = useState();

    // load
    useEffect(() => {
        axios.get(`http://localhost:3333/chamados/${id}`).then((response) => {
            const chamado = response.data;

            // set values
            setNumeroChamado(chamado.numero_chamado);
            setTitle(chamado.titulo);
            setDesc(chamado.descricao);
            // setComentario(chamado.comentario)
            setDataAbertura(chamado.data_abertura.replace('T', ' '))
            setEncerramento(chamado.data_encerramento)
            setListaComentarios(chamado.comentarios.reverse())
            setCategoria(chamado.categoria)
            setPrioridade(chamado.prioridade)
            setStatus(chamado.status)

            console.log('chamado:', chamado)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [dataAbertura, id]);

    function buttonAtualizar() {

        const chamado_atualizado = {
            novoComentario,
            categoria,
            prioridade,
            status
        }
        console.log(chamado_atualizado)

        axios.put(`http://localhost:3333/chamados/${numeroChamado}`, chamado_atualizado).then((response) => {
            console.log('Chamado atualizado')
            console.log(response.data)

            window.location.reload()
        }).catch((err) => {
            console.log(err);
        })
    }
    
    return (
        <div className='container'>
            <h1 className='title'>Detalhes do Incidente</h1>
            <button className="btn-criar" onClick={buttonAtualizar}>Atualizar</button>
            <div className='incident-content'>

                <div className='left-session'>
                    <SimpleInputLabel id='num_chamado' value={numeroChamado} disabled={true}/>
                    <SimpleInputLabel id='title' placeholder='Título' onChange={(e) => setTitle(e.target.value)} value={title} disabled={true}/>
                    <SimpleInputLabel id='desc' placeholder='Descrição detalhada' inputType='textarea' onChange={(e) => setDesc(e.target.value)} value={desc} disabled={true} text='desc'/>
                </div>

                <div className='right-session'>

                    <SelectOption label="Categoria" options={category_options} active={categoria} value={categoria} onChange={(e) => {setCategoria(e.target.value)}}/>
                    <SelectOption label="Prioridade" options={priority_options} active={prioridade} value={prioridade} onChange={(e) => {setPrioridade(e.target.value)}}/>
                    <SelectOption label="Status" options={status_options} active={status} value={status} onChange={(e) => {setStatus(e.target.value)}}/>
                    <SimpleInputLabel label="Abertura" inputType="datetime-local" value={dataAbertura} onChange={(e) => setDataAbertura(e.target.value)} disabled={true}/>
                    <SimpleInputLabel label="Encerramento" inputType="datetime-local" value={encerramento} onChange={(e) => setEncerramento(e.target.value)} disabled={true}/>

                    <SimpleInputLabel label="Solicitante" value={solicitante} onChange={(e) => setSolicitante(e.target.value)} disabled={true}/>
                </div>
            </div>

            <div className="container-comentarios">
                <SimpleInputLabel id='inputComentario' placeholder='Adicionar comentario' inputType='textarea' onChange={(e) => setNovoComentario(e.target.value)} value={novoComentario} text="add-comentario"/>

                {listaComentarios.map((item, index) => <ItemComentario key={index} text={item.text} datetime={item.datetime}/>)}
            </div>
        </div>
    )
}

export default ViewIncident;