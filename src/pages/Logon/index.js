import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg'

import BaseService from '../../services/base-service'

export default function Logon() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            await BaseService.login({ email, password });
            history.push('/profile')
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                 <img src={logoImg} alt="Logotipo"/>

                 <form onSubmit={handleLogin}>
                     <h1>Faça seu Logon</h1>

                     <input 
                        type="email" 
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                     <input 
                        type="password" 
                        placeholder="Sua senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                     <button className="button" type="submit" >Entrar</button>

                     <Link className="link" to="/register">
                         <FiLogIn size={16} color="#e02041" />
                         Não tenho registro
                     </Link>
                 </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}