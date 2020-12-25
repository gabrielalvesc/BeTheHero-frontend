import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg'

import BaseService from '../../services/base-service';

export default function Profile() {

    const ong = JSON.parse(localStorage.getItem('ong'));

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [pages, setPages] = useState([]);


    const history = useHistory();

    useEffect(() => {
        listItems();
    }, [currentPage]);

    async function listItems() {
        const params = { page: currentPage }
        const response = await BaseService.get('incidents', params);
        setData(response.data.items);
        setTotalRecords(response.data.totalRecords);
        setTotalPages(response.data.totalPages);
        pagination(response.data.totalPages);
    }

    async function handleDelete(id) {
        try {
            await BaseService.delete('incidents', id).then(response => {
                listItems();
            });
        } catch (error) {
            alert('Não doi possível deletar esse item. Tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function setPage(page) {
        setCurrentPage(page);
    }

    function pagination(totalPages) {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        setPages(pages);
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ong.name}</span>
                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button" >
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <div className="header-list">
                <h1>Casos cadastrados</h1>
                <div className="totalRecords">{totalRecords === 1 ? (
                    <span>{totalRecords} caso encontrado.</span>
                ) : (
                        <span>{totalRecords} casos encontrados.</span>
                    )}
                </div>
            </div>

            {data.length === 0 ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 80
                    }}>
                    Não há casos cadastrados.
                </div>
            ) : (
                    <div>
                        <ul>
                            {data.map(item => (
                                <li key={item.id}>
                                    <strong>CASO:</strong>
                                    <p>{item.title}</p>

                                    <strong>DESCRIÇÃO:</strong>
                                    <p>{item.description}</p>

                                    <strong>VALOR:</strong>
                                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</p>

                                    <button type="button" onClick={() => handleDelete(item.id)}>
                                        <FiTrash2 size={20} color="#a8a8b3" />
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="pagination">
                            <button disabled={currentPage === 1} className="prevPage" onClick={() => setPage(currentPage - 1)} type="button" >
                                <FiArrowLeft size={16} />
                            </button>
                            {pages.map(page => (
                                <button key={page} onClick={() => setPage(page)} type="button" className={currentPage === page ? "active" : "inactive"}>{page}</button>
                            ))}
                            <button disabled={currentPage === totalPages} className="nextPage" onClick={() => setPage(currentPage + 1)} type="button" >
                                <FiArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
}