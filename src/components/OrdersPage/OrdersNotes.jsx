import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { mergeRefs } from 'react-merge-refs';
import { usePDF } from 'react-to-pdf';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PrintIcon from '@mui/icons-material/Print';

export default function OrdersNotes() {
    const contentRef = useRef();
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
        <section className='flex flex-col space-x-2 text-center justify-center'>
            <div className='border border-black bg-white text-black p-8'>
                <div ref={mergeRefs([contentRef, targetRef])} className='flex flex-col items-start font-bold'>
                    <div className='flex flex-col items-start'>
                        <h1>Autorização p/ faturamento</h1>
                        <hr />
                        <p>Cliente: teste</p>
                    </div>
                    <div className='content-none bg-black w-96 h-0.5 mt-2 mb-2 opacity-50'></div>
                    <p className='mb-2'>Produtos adquiridos:</p>
                    <div className='flex flex-col items-start'>
                        <div className='flex flex-row space-x-1'>
                            <p className='w-28'>Produto</p>
                            <p className='w-10'>Qtd</p>
                            <p className='w-16'>R$</p>
                            <p>Subtotal</p>
                        </div>
                        <div className='mt-2'>
                            <div className='flex flex-row space-x-1'>
                                <p className='w-28'>nome do produto</p>
                                <p className='w-10'>quantidade do produto</p>
                                <p className='w-16'>preço do produto</p>
                                <p>subtotal do produto</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <p className='text-xl'>Valor total: R$ teste</p>
                    </div>
                    <div className='w-72 flex flex-col items-start justify-center'>
                        <div className='content-none bg-black w-48 h-0.5 mt-24 mb-2'></div>
                        <p>Assinatura</p>
                        <p className='mt-3'>Data do pedido: 00/00/00</p>
                        <p>Data de vencimento: 00/00/00</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row mt-5 space-x-3'>
                <Card>
                    <CardActionArea onClick={() => reactToPrintFn()}>
                        <CardContent>
                            <PrintIcon fontSize='large' />
                            <h1 className='font-bold text-xl mb-1'>Nota impressa</h1>
                            <p className='text-sm'>Selecione essa opção para ter uma visualização breve de sua nota e imprimi-la.</p>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card>
                    <CardActionArea onClick={toPDF}>
                        <CardContent>
                            <InsertDriveFileIcon fontSize='large' />
                            <div className='font-bold text-xl mb-1'>Nota em PDF</div>
                            <p className='text-sm'>Selecione essa opção para ter uma versão PDF da nota do seu pedido</p>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </section>
    );
}
