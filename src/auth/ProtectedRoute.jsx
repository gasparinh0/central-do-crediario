import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { Spinner } from '../ui/Spinner.jsx';
import { notifyError } from '../ui/Toast.jsx'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 3000);

        return () => clearTimeout(timer); // Evita problemas se o componente desmontar antes do tempo
    }, []);

    // Enquanto estiver carregando ou antes dos 3 segundos, exibe o Spinner
    if (loading || !showContent) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner />
            </div>
        );
    }

    // Se o usuário não estiver autenticado, redireciona para a página de login
    if (!user) {
        return (
            <>
                <Navigate to="/" replace />

            </>
        )
    }

    return children;
};

export default ProtectedRoute;
