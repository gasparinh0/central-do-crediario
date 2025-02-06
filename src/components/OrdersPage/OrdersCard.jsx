import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import OrdersExpandModal from './OrdersExpandModal'

export default function BasicCard() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)

    return (
        <section>
            <Card onClick={openModal}>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Nome do cliente
                        </Typography>
                        <Typography variant="h6">
                            Valor do pedido: 
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mt: 1 }}>Data: </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Expira em: </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <OrdersExpandModal isOpen={isModalOpen} onClose={closeModal} />
        </section>
    );
}