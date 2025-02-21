import ClientList from '../components/ClientsPage/ClientList.jsx'
import ClientButtons from '../components/ClientsPage/ClientButtons.jsx'
import { ClientProvider } from '../context/ClientContext.jsx'; // Importe o ClientProvider

export default function Clients() {
    return (
        <>
            <ClientProvider>
                <ClientButtons />
                <ClientList />
            </ClientProvider>
        </>
    )
}