import { useState } from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import ClientRegisterModal from './ClientRegisterModal'

import SearchIcon from '@mui/icons-material/Search';


export default function ClientButtons() {
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

                <Button onClick={openModal} variant="contained" className="w-48">
                    Cadastrar cliente
                </Button>
            </div>

            <div className='mb-3'>
                <Divider />
            </div>

            <ClientRegisterModal isOpen={isModalOpen} onClose={closeModal} />
        </section>
    )
}