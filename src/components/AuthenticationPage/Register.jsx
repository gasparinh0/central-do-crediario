import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAuth } from '../../auth/AuthContext'; // Importe o contexto
import { notifyError } from '../../ui/Toast.jsx'; // Importe o Toast para exibir erros

import Lottie from "lottie-react";
import concluded from "../../ui/concluded.json"; // Caminho para o arquivo JSON da animação

import { motion } from "framer-motion";

export default function Register({ title, subtitle, buttonText, onBackToLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false); // Estado para controlar se o cadastro foi realizado
    const { register, loading, error } = useAuth(); // Use o contexto

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validação do e-mail
        if (!email.includes('@')) {
            notifyError("E-mail inválido, digite o e-mail corretamente.", "", 3000); // Exibe o Toast de erro
            return; // Interrompe a execução se o e-mail for inválido
        }

        // Validação da senha
        if (password.length < 6) {
            notifyError("A senha deve possuir no minimo 6 caracteres, tente novamente.", "", 3000); // Exibe o Toast de erro
            return; // Interrompe a execução se a senha for inválida
        }

        // Se as validações passarem, tenta registrar o usuário
        const success = await register(name, email, password);
        if (success) {
            setIsRegistered(true); // Atualiza o estado para exibir a mensagem de sucesso
        }
    };

    if (isRegistered) {
        return (
            <div className='flex flex-col items-center justify-center mt-2'>
                <Lottie animationData={concluded} loop={false} style={{ width: 100, height: 100 }} />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className='flex flex-col items-center justify-center'
                >
                    <h1 className='text-2xl font-bold text-green-500'>Cadastro realizado!</h1>
                    <p className="text-xs">Você pode voltar ao login para acessar sua conta.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className="text-xs">{subtitle}</p>
            <form onSubmit={handleRegister} className='flex flex-col space-y-3 mt-2'>
                <TextField
                    id="name"
                    label="Digite seu nome"
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    id="email"
                    label="Digite seu email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    id="password"
                    label="Digite sua senha"
                    type="password"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className='bg-[#3b82f6] text-white p-1 w-52 mt-5 rounded-xl transition-all duration-200 hover:bg-[#5a92ec] hover:scale-105'
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : buttonText}
                </button>
            </form>
        </div>
    );
}