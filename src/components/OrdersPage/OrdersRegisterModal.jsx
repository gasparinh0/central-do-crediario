import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import OrdersNotes from './OrdersNotes'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const steps = ['Selecionar cliente', 'Cadastrar produtos', 'Nota do pedido'];

export default function OrdersRegisterModal({ isOpen, onClose }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [produtos, setProdutos] = React.useState(["Produto 1"]);

    if (!isOpen) return null; // Não renderiza o modal se não estiver aberto

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const adicionarProduto = () => {
        setProdutos([...produtos, `Produto ${produtos.length + 1}`]);
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {activeStep === 0 && (
                        <form className='flex flex-col space-y-3 text-center mb-10'>
                            <div>
                                <h1 className="font-bold text-lg">Escolha o cliente</h1>
                                <p className='text-gray-500 text-sm'>Preencha os campos correspondentes</p>
                            </div>
                            <div className="flex flex-row items-baseline justify-center space-x-2 ml-5">
                                <p>Cliente:</p>
                                <TextField label="Selecione o cliente" variant="standard" />
                            </div>
                            <div className="flex flex-row items-baseline justify-center space-x-2">
                                <p>Data do pedido:</p>
                                <TextField variant="standard" type='date' />
                            </div>
                        </form>
                    )}
                    {activeStep === 1 && (
                        <form className='flex flex-col justify-center items-center space-y-3 text-center mb-10'>
                            <div>
                                <h1 className="font-bold text-lg">Cadastre os produtos</h1>
                                <p className='text-gray-500 text-sm'>Preencha os nomes e adicione produtos</p>
                            </div>
                            <div className="flex flex-col items-baseline justify-center space-x-2">
                                {produtos.map((produto, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row items-baseline space-y-2.5 justify-center space-x-2"
                                    >
                                        <p>{produto}: </p>
                                        <TextField label="Digite o produto" variant="standard" />
                                        {index === produtos.length - 1 && (
                                            <AddCircleOutlineIcon
                                                onClick={adicionarProduto}
                                                className="cursor-pointer transition-all duration-200 text-blue-500 hover:text-blue-700"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </form>
                    )}
                    {activeStep === 2 && (
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className="font-bold text-lg">Nota do pedido</h1>
                            <p className='text-gray-500 text-sm mb-3'>Escolha o melhor jeito de gerar sua nota</p>
                            <OrdersNotes />
                        </div>
                    )}
                    <div className="mt-4 flex justify-between">
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Voltar
                        </Button>
                        {activeStep === steps.length - 1 ? (
                            <Button variant="contained" color="primary">
                                Salvar
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Próximo
                            </Button>
                        )}
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
}