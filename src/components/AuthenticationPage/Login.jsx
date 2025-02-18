import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import logo from '../../assets/logo.png';
import { useAuth } from '../../auth/AuthContext'; // Importe o contexto
import { notifyError } from '../../ui/Toast.jsx';
import { useNavigate } from 'react-router'; // Importe o hook useNavigate

export default function Login({ onForgetPassword, onRegister, title, subtitle, forgetPassword, buttonText }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth(); // Use o contexto
    const navigate = useNavigate(); // Inicialize o hook useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await login(email, password); // Chama a função de login
        if (success) {
            navigate('/dashboard'); // Redireciona para /dashboard se o login for bem-sucedido
        } else {
            notifyError("Erro ao realizar login, tente novamente", "", 3000); // Exibe o Toast de erro
        }
    };

    return (
        <div className="flex flex-col w-72">
            <div className='flex items-center mb-4'>
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <div className='flex flex-col ml-3'>
                    <h1 className='text-base'>Central do crediário</h1>
                </div>
            </div>

            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-xs'>{subtitle}{' '}
                <span
                    className='font-semibold text-blue-500 cursor-pointer'
                    onClick={onRegister}
                >
                    crie uma conta.
                </span>
            </p>
            <form onSubmit={handleLogin} className='flex flex-col space-y-3 mt-2'>
                <TextField
                    id="email"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    id="password"
                    label="Senha"
                    type="password"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p className='text-xs mt-2 font-semibold'>
                    <span className='font-semibold text-blue-500 cursor-pointer' onClick={onForgetPassword}>
                        {forgetPassword}
                    </span>
                </p>
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