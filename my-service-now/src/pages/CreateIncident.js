import { useEffect, useState } from 'react';
import SelectOption from '../components/SelectOption';
import SimpleInputLabel from '../components/SimpleInputLabel';
import './CreateIncident.css'
import axios from 'axios';

function CreateIncident() {
    const category_options = ['Rede', 'Software', 'Hardware'];
    const priority_options = ['Baixa', 'Média', 'Alta'];
    const status_options = ['Novo'];

    // state
    const [numero_chamado, setNumeroChamado] = useState('')
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [solicitante, setSolicitante] = useState('Lucas Mesquita');
    const [categoria, setCategoria] = useState(category_options[0])
    const [prioridade, setPrioridade] = useState(priority_options[0])
    
    useEffect(() => {
        axios.get('http://localhost:3333/chamados/next').then((response) => {
            const next_numero_chamado = response.data.next_id
            setNumeroChamado(next_numero_chamado)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    // Obter a data atual no formato YYYY-MM-DD hh:mm
    let now = new Date()
    now.setHours(now.getHours() - 3);
    now = now.toISOString().slice(0, 16);
    const [dateOpened, setDateOpened] = useState(now);

    function btnClickCriarChamado() {
        const chamado = {
            numero_chamado,
            titulo: title,
            descricao: desc,
            solicitante,
            categoria,
            prioridade,
            status: status_options[0]
        }
        
        axios.post('http://localhost:3333/chamados', chamado).then((response) => {
            console.log(response.data)
            window.location.href = 'http://localhost:3000/incidents'
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='container'>
            <h1 className='title'>Criando incidente</h1>
            <button className="btn-criar" onClick={btnClickCriarChamado}>Criar</button>

            <div className='incident-content'>

                <div className='left-session'>
                    <SimpleInputLabel id='num_chamado' value={numero_chamado} onChange={(e) => setNumeroChamado(e.target.value)} disabled={true}/>
                    <SimpleInputLabel id='title' placeholder='Título' onChange={(e) => setTitle(e.target.value)} value={title}/>
                    <SimpleInputLabel id='desc' inputClassName="input-descricao" placeholder='Descrição detalhada' inputType='textarea' onChange={(e) => setDesc(e.target.value)} value={desc} text='desc'/>
                </div>

                <div className='right-session'>

                    <SelectOption label="Categoria" options={category_options} value={categoria} onChange={(e) => setCategoria(e.target.value)}/>
                    <SelectOption label="Prioridade" options={priority_options}/>
                    <SelectOption label="Status" options={status_options} value={prioridade} onChange={(e) => setPrioridade(e.target.value)} disabled={true}/>
                    <SimpleInputLabel label="Abertura" inputType="datetime-local" value={dateOpened} onChange={(e) => setDateOpened(e.target.value)} disabled={true}/>

                    <SimpleInputLabel label="Solicitante" value={solicitante} onChange={(e) => setSolicitante(e.target.value)} disabled={true}/>
                </div>
            </div>
        </div>
    )
}

export default CreateIncident;