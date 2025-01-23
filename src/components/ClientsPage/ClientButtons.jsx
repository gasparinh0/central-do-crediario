import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import SearchIcon from '@mui/icons-material/Search';


export default function ClientButtons() {

    return (
        <section>
            <div className="mb-3 flex justify-between items-center">
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Pesquisar" variant="standard" />
                </Box>

                <Button variant="contained" className="w-28">
                    Cadastrar
                </Button>
            </div>

            <div className='mb-3'>
                <Divider />
            </div>
        </section>
    )
}