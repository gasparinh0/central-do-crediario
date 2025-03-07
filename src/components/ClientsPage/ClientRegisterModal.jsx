import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ClientContext } from '../../context/ClientContext';

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

export default function ClientRegisterModal({ isOpen, onClose, client }) {
    const [name, setName] = useState('');
    const [telephone, setPhone] = useState('');
    const { addClient, updateClient } = useContext(ClientContext);

    // Atualiza os estados se um cliente for passado para edição
    useEffect(() => {
        if (client) {
            setName(client.name);
            setPhone(client.telephone);
        } else {
            setName('');
            setPhone('');
        }
    }, [client]);

    const handleSubmit = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.userId : null;

        if (client) {
            // Atualizar cliente existente
            const updatedClient = { name, telephone, userId };
            try {
                await updateClient(client._id, updatedClient);
                onClose();
            } catch (err) {
                alert('Erro ao atualizar cliente');
            }
        } else {
            // Cadastrar novo cliente
            const newClient = { name, telephone, userId };
            try {
                await addClient(newClient);
                onClose();
            } catch (err) {
                alert('Erro ao cadastrar cliente');
            }
        }
        onClose()
    };

    if (!isOpen) return null;

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="space-y-5 text-center">
                    <div>
                        <h1 className="font-bold text-lg">{client ? 'Editar Cliente' : 'Realizar Cadastro'}</h1>
                        <p className='text-gray-500 text-sm'>
                            {client ? 'Atualize as informações do cliente' : 'Preencha os campos correspondentes'}
                        </p>
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
                    <Button onClick={handleSubmit} variant="contained" className="w-48">
                        {client ? 'Salvar Alterações' : 'Cadastrar'}
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}
