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
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>data do pedido</Typography>
                        <Typography variant="body2">
                            Valor total do pedido:
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <OrdersExpandModal isOpen={isModalOpen} onClose={closeModal} />
        </section>
    );
}