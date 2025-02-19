import React, { createContext, useState, useEffect } from 'react';

// Cria o contexto
export const ClientContext = createContext();

// Provider do contexto
export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os clientes da API
  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/clients');
      if (!response.ok) {
        throw new Error('Erro ao buscar clientes');
      }
      const data = await response.json();
      setClients(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Função para adicionar um cliente
  const addClient = async (newClient) => {
    try {
      const response = await fetch('http://localhost:8080/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar cliente');
      }
      const data = await response.json();
      setClients([...clients, data]); // Adiciona o novo cliente à lista
    } catch (err) {
      setError(err.message);
    }
  };

  // Função para atualizar um cliente
  const updateClient = async (id, updatedClient) => {
    try {
      const response = await fetch(`http://localhost:8080/api/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClient),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar cliente');
      }
      const data = await response.json();
      setClients(clients.map(client => (client._id === id ? data : client))); // Atualiza o cliente na lista
    } catch (err) {
      setError(err.message);
    }
  };

  // Função para deletar um cliente
  const deleteClient = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/clients/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar cliente');
      }
      setClients(clients.filter(client => client._id !== id)); // Remove o cliente da lista
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