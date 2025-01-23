import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function BasicCard() {
    return (
        <Card>
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
    );
}