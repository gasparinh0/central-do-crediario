import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react'; // Importe o useContext
import { ClientContext } from '../../context/ClientContext'; // Importe o ClientContext

import { formatToPhone } from 'brazilian-values';

export default function ClientList() {
  // Acesse os dados do contexto
  const { clients, loading, error } = useContext(ClientContext);

  // Se estiver carregando, exiba uma mensagem de carregamento
  if (loading) {
    return <div>Carregando clientes...</div>;
  }

  // Se houver um erro, exiba uma mensagem de erro
  if (error) {
    return <div>Erro ao carregar clientes: {error}</div>;
  }

  if (clients.length === 0) {
    return <div className='flex justify-center items-center text-xl mt-9 text-gray-400'>Nenhum cliente encontrado.</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Telefone</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow
              key={client._id} // Use o ID do cliente como chave
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {client.name}
              </TableCell>
              <TableCell align="right">{formatToPhone(client.telephone)}</TableCell>
              <TableCell align="right">
                <EditIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              </TableCell>
              <TableCell align="right">
                <DeleteIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}