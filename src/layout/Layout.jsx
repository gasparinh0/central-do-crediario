import * as React from 'react';
import { Outlet } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Typography from '@mui/material/Typography';
import { useAuth } from '../auth/AuthContext'; // Importe o contexto
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';

function SidebarFooter({ mini }) {
  const { logout } = useAuth(); // Use o hook useAuth para acessar a função de logout

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
  };

  return (
      <IconButton
        onClick={handleLogout}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          marginLeft: '10px',
          marginBottom: '5px',
          '&:hover': {
            backgroundColor: 'transparent', // Remove o fundo ao passar o mouse
            boxShadow: 'none', // Remove a sombra ao passar o mouse
          },
        }}
      >
        <LogoutIcon />
        {!mini && (
          <Typography variant="caption" sx={{ ml: 1 }}>
            Fazer logout
          </Typography>
        )}
      </IconButton>
  );
}

export default function Layout() {
  return (
    <DashboardLayout slots={{ sidebarFooter: SidebarFooter }}>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}