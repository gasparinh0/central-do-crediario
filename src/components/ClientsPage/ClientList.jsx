import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext } from 'react';
import { ClientContext } from '../../context/ClientContext';
import { formatToPhone } from 'brazilian-values';

import ClientProfile from './ClientProfile';

export default function ClientList({ searchTerm }) {
  const { clients, loading, error } = useContext(ClientContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleOpenDrawer = (client) => {
    setSelectedClient(client);
    setOpenDrawer(true);
  };

  // Filtrando clientes pelo nome com base no termo da pesquisa
  const filteredClients = (clients || [])
  .filter(client => client?.name?.toLowerCase().includes(searchTerm?.toLowerCase() || ""));

  if (loading) {
    return <div>Carregando clientes...</div>;
  }

  if (error) {
    return <div>Erro ao carregar clientes: {error}</div>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell align='right'>Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client._id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{formatToPhone(client.telephone)}</TableCell>
                  <TableCell className='cursor-pointer' align='right' onClick={() => handleOpenDrawer(client)}><MoreVertIcon /></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" style={{ color: 'gray' }}>
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ClientProfile
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        client={selectedClient}
      />
    </>
  );
}
