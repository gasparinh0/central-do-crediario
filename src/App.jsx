import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'clients',
    title: 'Clientes',
    icon: <PersonIcon />,
  },
  {
    segment: 'orders',
    title: 'Pedidos',
    icon: <ShoppingCartIcon />,
  },
];

const BRANDING = {
  title: 'Central do crediário',
};


function App() {

  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  )
}

export default App
