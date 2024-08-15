import React from "react"
import './IncidentView.css'
import ItemChamado from "../components/ItemChamado";
import { Link } from "react-router-dom";

function IncidentView() {
    return (
        <div className="incident-container">
            <h1>Lista de Incidentes</h1>

            <Link to="/new-incident">
                <button className="btn-new-incident">Novo</button>
            </Link>

            <div>
                <ItemChamado id={1} number={'INC000100'} priority={'Alta'} status={'Em aberto'} title={'Extração'} key={1}/>
                <ItemChamado id={1} number={'INC000200'} priority={'Baixa'} status={'Em Andamento'} title={'T2R'} key={2}/>
                <ItemChamado id={1} number={'INC000300'} priority={'Média'} status={'Em andamento'} title={'Extração'} key={3}/>
                <ItemChamado id={1} number={'INC000301'} priority={'Baixa'} status={'Em andamento'} title={'Correção'} key={4}/>
            </div>
        </div>
    )
}

export default IncidentView;