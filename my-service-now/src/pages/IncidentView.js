import React, { useEffect, useState } from "react"
import './IncidentView.css'
import ItemChamado from "../components/ItemChamado";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function IncidentView() {

    const [listaChamados, setListaChamados] = useState([])

    const location = useLocation();
    const query = new URLSearchParams(useLocation().search);
    const filter_status = query.get('status');

    useEffect(() => {
        console.log(filter_status)

        axios.get(`http://localhost:3333/chamados${filter_status ? `?status=${filter_status}` : ''}`).then((response) => {
            console.log(response.data)
            setListaChamados(response.data)
        })

    }, [filter_status, location.search])

    return (
        <div className="incident-container">
            <h1>Lista de Incidentes</h1>

            <Link to="/new-incident">
                <button className="btn-new-incident">Novo</button>
            </Link>

            <div>
                {listaChamados.map((chamado, index) => 
                    <ItemChamado id={index} number={chamado.numero_chamado} priority={chamado.prioridade} status={chamado.status} title={chamado.titulo} key={index} />
                )}
            </div>
        </div>
    )
}

export default IncidentView;