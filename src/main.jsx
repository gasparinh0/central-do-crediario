import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';

import Layout from './layout/Layout.jsx'
import AuthLayout from './layout/AuthLayout.jsx'

import DashboardPage from './pages/Dashboard.jsx'
import ClientsPage from './pages/Clients.jsx'
import OrdersPage from './pages/Orders.jsx'

import Authentication from './pages/Authentication.jsx'

import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: '',
            element: <Authentication />,
          },
        ],
      },
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'orders',
            element: <OrdersPage />,
          },
          {
            path: 'clients',
            element: <ClientsPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
