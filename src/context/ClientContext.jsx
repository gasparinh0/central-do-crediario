import React, { createContext, useState, useEffect } from 'react';
import { notifySuccess } from '../ui/Toast'

// Cria o contexto
export const ClientContext = createContext();

// Provider do contexto
export const ClientProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchClients = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/clients', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}` // Adicione o token de autenticação
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar clientes');
            }
            const data = await response.json();
            setClients(data); // Atualiza a lista de clientes com os dados da API
            setLoading(false); // Define o carregamento como falso
        } catch (err) {
            setError(err.message); // Define o erro
            setLoading(false); // Define o carregamento como falso
        }
    };

    // Função para adicionar um cliente
    const addClient = async (newClient) => {
        try {
            const response = await fetch('http://localhost:8080/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}` // Adicione o token de autenticação
                },
                body: JSON.stringify(newClient),
            });
            if (!response.ok) {
                throw new Error('Erro ao adicionar cliente');
            }
            const data = await response.json();
            setClients([...clients, data]); // Adiciona o novo cliente à lista local
            notifySuccess("Cliente cadastrado com sucesso.", "bottom-right", 3000); // Exibe o Toast
            await fetchClients(); // Atualiza a lista de clientes com os dados mais recentes da API
        } catch (err) {
            setError(err.message); // Define o erro
        }
    };

    // Função para atualizar um cliente
    const updateClient = async (id, updatedClient) => {
        try {
            const response = await fetch(`http://localhost:8080/api/clients/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(updatedClient),
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar cliente');
            }
            const data = await response.json();
            setClients(clients.map(client => (client._id === id ? data : client))); // Atualiza o cliente na lista
            await fetchClients(); // Atualiza a lista de clientes com os dados mais recentes da API
            notifySuccess("Dados atualizados com sucesso.", "bottom-right", 3000); // Exibe o Toast
        } catch (err) {
            setError(err.message);
        }
    };

    // Função para deletar um cliente
    const deleteClient = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/clients/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar cliente');
            }
            setClients(clients.filter(client => client._id !== id)); // Remove o cliente da lista
            notifySuccess("Cliente deletado com sucesso.", "bottom-right", 3000); // Exibe o Toast
        } catch (err) {
            setError(err.message);
        }
    };

    // Efeito para buscar os clientes quando o componente é montado
    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <ClientContext.Provider value={{
            clients,
            loading,
            error,
            addClient,
            updateClient,
            deleteClient
        }}>
            {children}
        </ClientContext.Provider>
    );
};