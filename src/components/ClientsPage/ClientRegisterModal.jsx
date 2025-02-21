import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ClientContext } from '../../context/ClientContext'; // Importe o ClientContext

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ClientRegisterModal({ isOpen, onClose }) {
    const [name, setName] = useState('');
    const [telephone, setPhone] = useState('');
    const { addClient } = useContext(ClientContext); // Acesse a função addClient do contexto

    const handleRegister = async () => {
        // Obter o token do LocalStorage
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.userId : null;

        // Criar o objeto do cliente
        const newClient = {
            name,
            telephone,
            userId, // Adicionar o userId ao cliente
        };

        try {
            await addClient(newClient); // Chamar a função addClient do contexto
            onClose(); // Fechar o modal após o cadastro
        } catch (err) {
            alert('Erro ao cadastrar cliente');
        }
    };

    if (!isOpen) return null; // Não renderiza o modal se não estiver aberto

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="space-y-5 text-center"> {/* Centraliza o texto */}
                    <div>
                        <h1 className="font-bold text-lg">Realizar cadastro</h1>
                        <p className='text-gray-500 text-sm'>Preencha os campos correspondentes</p>
                    </div>
                    <div className="flex flex-row items-baseline justify-center space-x-2 ml-4">
                        <p>Nome</p>
                        <TextField 
                            label="Digite o nome" 
                            variant="standard" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row items-baseline justify-center space-x-2">
                        <p>Telefone</p>
                        <TextField 
                            label="Digite o telefone" 
                            variant="standard" 
                            value={telephone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleRegister} variant="contained" className="w-48">
                        Cadastrar
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}