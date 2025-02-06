import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorIcon from '@mui/icons-material/Error';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    maxHeight: '90vh',
    boxShadow: 24,
    p: 4,
};

export default function OrdersExpandModal({ isOpen, onClose }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showContent, setShowContent] = useState(true); // Estado para controlar a visibilidade do conteúdo
    const [showMainContent, setShowMainContent] = useState(true); // Estado para controlar a visibilidade dos elementos principais

    useEffect(() => {
        const checkDarkMode = () => {
            const mode = localStorage.getItem('toolpad-mode');
            setIsDarkMode(mode === 'dark');
        };

        checkDarkMode();

        const handleStorageChange = (event) => {
            if (event.key === 'toolpad-mode') {
                checkDarkMode();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const getBackgroundClass = () => {
        return isDarkMode ? 'hover:bg-[#222121]' : 'hover:bg-[#fbfcff]';
    };

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddCircleClick = () => {
        setShowContent(false); // Oculta o conteúdo do modal
    };

    const handleBackClick = () => {
        setShowContent(true); // Mostra o conteúdo do modal novamente
    };

    const handleMoneyOffClick = () => {
        setShowMainContent(false); // Oculta os elementos principais
    };

    const handleMainContentBackClick = () => {
        setShowMainContent(true); // Mostra os elementos principais novamente
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {showMainContent ? (
                    showContent ? (
                        <section>
                            <div className='flex justify-between'>
                                <div>
                                    <h1 className='text-3xl'>Nome do cliente</h1>
                                    <p>Data do pedido: </p>
                                </div>
                                <div className='space-x-4 cursor-pointer'>
                                    <Tooltip title="Ver nota"><InsertDriveFileIcon /></Tooltip>
                                    <Tooltip title="Arquivar"><FolderIcon /></Tooltip>
                                    <Tooltip title="Fechar"><CancelIcon /></Tooltip>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <div className='flex flex-row space-x-2 items-center'>
                                    <h1 className='text-lg font-semibold mb-2'>Produtos</h1>
                                    <Tooltip title="Adicionar produto">
                                        <AddCircleIcon fontSize='medium' className='mb-2 transition-all duration-300 text-green-400 hover:text-green-200' onClick={handleAddCircleClick} />
                                    </Tooltip>
                                </div>
                                <div className='max-h-40 overflow-y-auto'>
                                    <div onClick={handleClick} className={`${getBackgroundClass()} flex justify-between w-[600px] transition-all duration-200 p-1 hover:rounded-xl hover:scale-[98%] cursor-pointer`}>
                                        <div className='flex flex-row items-center mb-2'>
                                            <div>
                                                <p>Caderno</p>
                                                <p className='text-gray-500'>Adicionado em: 20/01/2025</p>
                                            </div>
                                        </div>

                                        <div className='flex flex-row items-start space-x-9 justify-start'>
                                            <div>
                                                <p className='w-20'>Quantidade</p>
                                                <p>1</p>
                                            </div>
                                            <div>
                                                <p className='w-20'>Valor</p>
                                                <p>R$ 10,00</p>
                                            </div>
                                            <div>
                                                <p className='w-20'>Subtotal</p>
                                                <p>R$ 10,00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem>Editar</MenuItem>
                                        <MenuItem>Excluir</MenuItem>
                                    </Menu>
                                </div>
                                <div className='mt-2'>
                                    <div className='flex items-center space-x-2 mb-3'>
                                        <h1 className='text-xl'>Total: <span className='font-bold'>R$ 100,00</span></h1>
                                        <Tooltip title="Abater valor">
                                            <MoneyOffIcon className="cursor-pointer text-red-400" onClick={handleMoneyOffClick} />
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <h1 className='text-lg font-bold mb-2'>Histórico de abatimentos</h1>
                                    <ul>
                                        <li>- Valor: R$ 100,00 - 16/09/23</li>
                                        <li>- Valor: R$ 50,00 - 16/09/23</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <div>
                            <ArrowBackIcon className="cursor-pointer top-2 left-2" onClick={handleBackClick} />
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className="font-bold text-lg">Adicionar produtos</h1>
                                <p className='text-gray-500 text-sm mb-3'>Cadastre um novo produto preenchendo os campos.</p>
                                <div className='space-y-3 flex flex-col justify-center items-center'>
                                    <div className="flex flex-row items-baseline justify-center space-x-2">
                                        <p>Nome</p>
                                        <TextField label="Digite o nome" variant="standard" />
                                    </div>
                                    <div className="flex flex-row items-baseline justify-center space-x-2 mr-10">
                                        <p>Quantidade</p>
                                        <TextField label="Digite a quantidade" variant="standard" />
                                    </div>
                                    <div className="flex flex-row items-baseline justify-center space-x-2">
                                        <p>Preço</p>
                                        <TextField label="Digite o preço" variant="standard" />
                                    </div>
                                    <Button variant="contained" className="w-28">
                                        Cadastrar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <div>
                        <ArrowBackIcon className="cursor-pointer top-2 left-2" onClick={handleMainContentBackClick} />
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-bold text-lg">Abater valor do pedido</h1>
                            <p className='text-gray-500 text-sm mb-5'>Digite o valor a ser abatido e confira os resultados.</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className="flex flex-col items-baseline justify-center space-x-2">
                                <p className='font-bold text-[#7b7c85] mb-1'>Informações do pedido</p>
                                <p><span className='font-semibold'>Cliente:</span> Lucas Gaspari</p>
                                <p><span className='font-semibold'>Data:</span> 06/02/2025</p>
                                <div className='flex flex-row space-x-1 items-center mt-1 text-red-400'>
                                    <ErrorIcon fontSize='small' />
                                    <p className='text-sm'>Esse pedido possui abatimentos anteriores.</p>
                                </div>
                                <div className='flex flex-row space-x-2 items-baseline mt-5'>
                                    <p>Valor a ser abatido:</p>
                                    <TextField label="R$" variant="standard" className='w-20' />
                                </div>
                                <div className='mt-8'>
                                    <Button variant="contained" className='w-80'>Abater valor</Button>
                                </div>
                            </div>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div className='flex flex-col items-center'>
                                            <h1>Total:</h1>
                                            <p className='text-3xl mb-1 text-green-400 font-bold'>50,00</p>
                                            <Divider className='w-56'/>
                                            <div className='w-full'>
                                                <div className='flex flex-row justify-between mt-5'>
                                                    <p className='text-[#7b7c85]'>Total do pedido:</p>
                                                    <p>100,00</p>
                                                </div>
                                                <div className='flex flex-row justify-between mt-1 mb-5'>
                                                    <p className='text-[#7b7c85]'>Abatimento:</p>
                                                    <p>50,00</p>
                                                </div>
                                                <Divider className='w-56'/>
                                                <div className='flex flex-row justify-between mt-3'>
                                                    <p className='text-[#7b7c85]'>Valor final:</p>
                                                    <p className='text-green-400 font-semibold'>50,00</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </Box>
        </Modal>
    );
}