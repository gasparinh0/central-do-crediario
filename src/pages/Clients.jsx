import { useState } from 'react';
import ClientList from '../components/ClientsPage/ClientList.jsx'
import ClientButtons from '../components/ClientsPage/ClientButtons.jsx'
import { ClientProvider } from '../context/ClientContext.jsx'; // Importe o ClientProvider

export default function Clients() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <ClientProvider>
                <ClientButtons setSearchTerm={setSearchTerm} />
                <ClientList searchTerm={searchTerm} />
            </ClientProvider>
        </>
    )
}