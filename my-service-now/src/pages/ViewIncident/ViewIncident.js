import { useState } from 'react';
import SelectOption from '../../components/SelectOption';
import SimpleInputLabel from '../../components/SimpleInputLabel';
import './ViewIncident.css'
import ItemComentario from '../../components/ItemComentario';

function ViewIncident() {

    const category_options = ['Rede', 'Software', 'Hardware'];
    const priority_options = ['Baixa', 'Média', 'Alta'];
    const status_options = ['Novo'];

    // state
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [solicitante, setSolicitante] = useState('Lucas Mesquita');
    const [comentario, setComentario] = useState('');

    // Obter a data atual no formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    const [dateOpened, setDateOpened] = useState(today);
    const [encerramento, setEncerramento] = useState();
    
    return (
        <div className='container'>
            <h1 className='title'>Detalhes do Incidente</h1>
            <button className="btn-criar">Atualizar</button>
            <div className='incident-content'>

                <div className='left-session'>
                    <SimpleInputLabel id='num_chamado' value={'INC000001'} disabled={true}/>
                    <SimpleInputLabel id='title' placeholder='Título' onChange={(e) => setTitle(e.target.value)} value={title} disabled={true}/>
                    <SimpleInputLabel id='desc' placeholder='Descrição detalhada' inputType='textarea' onChange={(e) => setDesc(e.target.value)} value={desc} disabled={true} text='desc'/>
                </div>

                <div className='right-session'>

                    <SelectOption label="Categoria" options={category_options}/>
                    <SelectOption label="Prioridade" options={priority_options}/>
                    <SelectOption label="Status" options={status_options} />
                    <SimpleInputLabel label="Abertura" inputType="date" value={dateOpened} onChange={(e) => setDateOpened(e.target.value)} disabled={true}/>
                    <SimpleInputLabel label="Encerramento" inputType="date" value={encerramento} onChange={(e) => setEncerramento(e.target.value)} disabled={true}/>

                    <SimpleInputLabel label="Solicitante" value={solicitante} onChange={(e) => setSolicitante(e.target.value)} disabled={true}/>
                </div>
            </div>

            <div className="container-comentarios">
                <SimpleInputLabel id='inputComentario' placeholder='Adicionar comentario' inputType='textarea' onChange={(e) => setComentario(e.target.value)} value={comentario} text="add-comentario"/>
                <ItemComentario text="Abrimos o chamado ontem, e a equipe de suporte já começou a investigar o problema. Até agora, identificaram que o erro está relacionado a uma configuração incorreta no servidor. A correção deve ser aplicada ainda hoje."/>
                <ItemComentario text="Após a análise inicial, verificamos que o problema relatado pelos usuários está relacionado a uma incompatibilidade entre a nova versão do software e o hardware legado em uso por algumas estações de trabalho. A equipe de desenvolvimento foi informada e está trabalhando em um patch para corrigir essa incompatibilidade. Enquanto isso, sugerimos que os usuários afetados revertam temporariamente para a versão anterior do software, o que deve mitigar o impacto até que a correção seja liberada. Também iniciamos um processo de comunicação interna para garantir que todos os usuários sejam informados sobre essa situação e as ações recomendadas. A previsão é que o patch seja liberado em até 48 horas, mas continuaremos monitorando e forneceremos atualizações assim que tivermos mais informações."/>
                <ItemComentario text="A correção foi implementada e o sistema voltou ao funcionamento normal. Continuaremos monitorando por 24 horas para garantir que o problema não volte a ocorrer."/>
                <ItemComentario text="A correção aplicada anteriormente não foi suficiente para resolver o problema de forma definitiva. Vamos realizar uma nova análise mais aprofundada."/>
            </div>
        </div>
    )
}

export default ViewIncident;