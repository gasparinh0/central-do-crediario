import { useState } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import SearchIcon from '@mui/icons-material/Search';

import OrdersRegisterModal from './OrdersRegisterModal'


export default function OrdersButtons() {
        const [isModalOpen, setIsModalOpen] = useState(false);
    
        const openModal = () => setIsModalOpen(true);
        const closeModal = () => setIsModalOpen(false);

    return (
        <section>
            <div className="mb-3 flex justify-between items-center">
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Pesquisar" variant="standard" />
                </Box>

                <Button onClick={openModal} variant="contained" className="w-36">
                    Criar pedido
                </Button>
            </div>

            <div className='mb-3'>
                <Divider />
            </div>

            <OrdersRegisterModal isOpen={isModalOpen} onClose={closeModal} />
        </section>
    )
}