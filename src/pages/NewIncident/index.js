import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import IntlCurrencyInput from "react-intl-currency-input"

import './styles.css';

import logoImg from '../../assets/logo.svg'

import BaseService from '../../services/base-service';

const currencyConfig = {
    locale: "pt-BR",
    formats: {
        number: {
            BRL: {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            },
        },
    },
};

export default function NewIncident() {

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(null);

    async function handleNewIncident(e) {
        e.preventDefault();
        BaseService.post('incidents', { title, description, value }).then(() => {
            history.push('/profile')
        });
    }

    const onInputMaskedChange = (event, value, maskedValue) => {
        event.preventDefault();
        setValue(value)
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói que resolva isso.</p>
                    <Link to="/profile" className="link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para a home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>

                    <IntlCurrencyInput placeholder="Valor em reais" currency="BRL" config={currencyConfig}
                        onChange={onInputMaskedChange} />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}