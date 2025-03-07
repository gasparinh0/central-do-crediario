import React, { useState, useEffect, useContext } from 'react';
import { ClientContext } from '../../context/ClientContext';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';
import ConfirmationModal from '../../ui/ConfirmationModal'; // Importando o modal
import ClientRegisterModal from './ClientRegisterModal';

export default function SocialButtons({ client, onClose }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { deleteClient } = useContext(ClientContext);
    const [openModal, setOpenModal] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)

    const handleDelete = () => {
        setOpenModal(true); // Abre o modal ao clicar no botão de deletar
    };

    const handleEdit = () => {
        setOpenEdit(true)
    }

    const confirmDelete = () => {
        deleteClient(client._id);
        setOpenModal(false); // Fecha o modal
        onClose(); // Fecha o Drawer
    };

    useEffect(() => {
        const mode = localStorage.getItem('toolpad-mode');
        setIsDarkMode(mode === 'dark');
    }, []);

    const getBackgroundClass = () => (isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white');

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <Tooltip title="Entrar em contato">
                    <a href={`https://wa.me/${client.telephone}`} target="_blank" rel="noopener noreferrer">
                        <button
                            className={`w-24 h-24 ${getBackgroundClass()} rounded-[90px_5px_5px_5px] shadow-md transition-transform duration-200 text-green-400 hover:scale-110 hover:bg-[#4ade80] hover:text-white`}
                        >
                            <WhatsAppIcon sx={{ width: 30, height: 30 }} color="inherit" />
                        </button>
                    </a>
                </Tooltip>
                <Tooltip title="Apagar cliente">
                    <button
                        onClick={handleDelete}
                        className={`w-24 h-24 ${getBackgroundClass()} rounded-[5px_90px_5px_5px] shadow-md transition-transform duration-200 text-red-400 hover:scale-110 hover:bg-[#f87171] hover:text-white`}
                    >
                        <DeleteIcon sx={{ width: 30, height: 30 }} color="inherit" />
                    </button>
                </Tooltip>
            </div>
            <div className="flex gap-2">
                <Tooltip title="Editar cliente">
                    <button
                        onClick={handleEdit}
                        className={`w-24 h-24 ${getBackgroundClass()} rounded-[5px_5px_5px_90px] shadow-md transition-transform duration-200 text-blue-400 hover:scale-110 hover:bg-[#60a5fa] hover:text-white`}
                    >
                        <EditIcon sx={{ width: 30, height: 30 }} color="inherit" />
                    </button>
                </Tooltip>
                <Tooltip title="Ainda não tem feature :(">
                    <button
                        className={`w-24 h-24 ${getBackgroundClass()} rounded-[5px_5px_90px_5px] shadow-md transition-transform duration-200 text-gray-400 hover:scale-110 hover:bg-[#9ca3af] hover:text-white`}
                    >
                        <MoreHorizIcon sx={{ width: 30, height: 30 }} color="inherit" />
                    </button>
                </Tooltip>
            </div>

            {/* Modal de Confirmação */}
            <ConfirmationModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                principalText={`Tem certeza que deseja apagar o cliente ${client.name}?`}
                onConfirm={confirmDelete}
            />

            <ClientRegisterModal
                isOpen={openEdit}
                onClose={() => {
                    setOpenEdit(false);
                    onClose(); // Fecha o Drawer ao confirmar edição
                }}
                client={client}
            />
        </div>
    );
}
