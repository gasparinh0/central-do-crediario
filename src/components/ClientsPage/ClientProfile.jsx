import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import ClientProfileButtons from './ClientProfileButtons'

import { formatToPhone } from 'brazilian-values';

export default function ClientProfile({ open, onClose, client }) {
  // Função para obter as iniciais do nome
  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    const initials = nameParts
      .slice(0, 2) // Pega apenas os dois primeiros nomes
      .map(part => part.charAt(0).toUpperCase())
      .join('');
    return initials;
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, marginTop: 10 }}>
        <div className='flex flex-row items-center ml-3 text-[#757575]'><HighlightOffIcon className='mr-1 cursor-pointer' onClick={onClose} />Fechar</div>
        {client ? (
          <div className='mt-7 flex flex-col items-center'>
            <div className='flex flex-col items-center justify-center space-y-1'>
              <Avatar sx={{ width: 65, height: 65 }}>{getInitials(client.name)}</Avatar>
              <h1 className='text-2xl font-medium'>{client.name}</h1>
              <p className='font-extralight'>{formatToPhone(client.telephone)}</p>
            </div>
            <div className="w-80 left-0 right-0 border-t border-gray-300 my-5"></div>
            <div>
              <ClientProfileButtons client={client} onClose={onClose} />
            </div>
          </div>
        ) : (
          <Typography variant="body2">Nenhum cliente selecionado</Typography>
        )}
      </Box>
    </Drawer>
  );
}
