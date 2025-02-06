import React, { useEffect, useState } from 'react';

//Imports de components
import Register from '../components/AuthenticationPage/Register';
import Login from '../components/AuthenticationPage/Login';
import ForgetPassword from '../components/AuthenticationPage/ForgetPassword';

//Imports do react-icons
import { IoIosReturnLeft } from "react-icons/io";

export default function Authentication() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isForgetPassword, setIsForgetPassword] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Verifica o modo atual no localStorage
        const mode = localStorage.getItem('toolpad-mode');
        setIsDarkMode(mode === 'dark');
    }, []);

    const getBackgroundClass = () => {
        return isDarkMode ? 'bg-[#121212]' : 'bg-white';
    };

    return (
        <div className="bg-login-background bg-left-bottom bg-cover">
            {!isRegistering ? (
                !isForgetPassword ? (
                    <main className={`${getBackgroundClass()} shadow-2xl w-[600px] min-h-screen flex items-center justify-center rounded-r-2xl`}>
                        <Login
                            onRegister={() => setIsRegistering(true)}
                            onForgetPassword={() => setIsForgetPassword(true)}
                            title="Bem vindo!"
                            subtitle="Novo na central?"
                            forgetPassword="Esqueci minha senha"
                            buttonText="Entrar"
                        />
                    </main>
                ) : (
                    <main className={`${getBackgroundClass()} shadow-2xl w-[600px] min-h-screen flex items-center justify-center rounded-r-2xl transition-all duration-300`}>
                        <div className="flex flex-col w-72">
                            <div
                                onClick={() => setIsForgetPassword(false)}
                                className="flex flex-row items-center cursor-pointer space-x-2"
                            >
                                <IoIosReturnLeft size={30} />
                                <p>Voltar</p>
                            </div>
                            <ForgetPassword 
                            title="Contate os desenvolvedores!"
                            subtitle="No momento, não temos suporte para recuperação de senha por conta própria, mande um email para lucas.gaspari2004@gmail.com explicando sua situação para podermos retormar com sua senha."
                            />
                        </div>
                    </main>
                )
            ) : (
                <main className={`${getBackgroundClass()} shadow-2xl w-[600px] min-h-screen flex items-center justify-center rounded-r-2xl transition-all duration-300`}>
                    <div className="flex flex-col w-72">
                        <div
                            onClick={() => setIsRegistering(false)}
                            className="flex flex-row items-center cursor-pointer space-x-2"
                        >
                            <IoIosReturnLeft size={30} />
                            <p>Voltar</p>
                        </div>
                        <Register
                            title="Crie sua conta"
                            subtitle="É sempre bom ter você por aqui!"
                            buttonText="Registrar"
                        />
                    </div>
                </main>
            )}
        </div>
    );
}
