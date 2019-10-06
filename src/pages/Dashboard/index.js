import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

export default function Dashboard () {
    const [spots, setSpots] = useState([])

    // useEffect(() => {},[]) : carrega a informação assim que acessa a página
    // [] : array de dependência, toda vez que esse valor alterar executa a função 
    // array vazio significa assim que carregar

    useEffect(() => {
        async function loadSpots () {
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', { headers: { user_id } })

            setSpots(response.data)
        }

        loadSpots()
    }, [])

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    < li key={spot._id} >
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/new">
                <button className="btn">
                    Cadastrar novo spot
                </button>
            </Link>
        </>
    )
}