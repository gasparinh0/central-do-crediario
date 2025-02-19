import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Cria o contexto
const AuthContext = createContext();

// Provedor do contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carregamento inicial
    const [error, setError] = useState(null);

    // Verifica se há um usuário no localStorage ao carregar a aplicação
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Define o usuário a partir do localStorage
        }
        setLoading(false); // Finaliza o carregamento
    }, []);

    // Função para realizar o login
    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, password });
            setUser(response.data); // Define o usuário no estado
            localStorage.setItem('user', JSON.stringify(response.data)); // Armazena o usuário no localStorage
            setLoading(false);
            return true; // Retorna true para indicar sucesso
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao realizar login');
            setLoading(false);
            return false; // Retorna false para indicar erro
        }
    };

    // Função para realizar o cadastro
    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/register', { name, email, password });
            setUser(response.data); // Define o usuário no estado
            localStorage.setItem('user', JSON.stringify(response.data)); // Armazena o usuário no localStorage
            setLoading(false);
            return true; // Retorna true para indicar sucesso
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao realizar cadastro');
            setLoading(false);
            return false; // Retorna false para indicar erro
        }
    };

    // Função para realizar o logout
    const logout = () => {
        setUser(null); // Remove o usuário do estado
        localStorage.removeItem('user'); // Remove o usuário do localStorage
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
    return useContext(AuthContext);
};