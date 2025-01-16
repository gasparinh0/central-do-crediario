import TextField from '@mui/material/TextField';

export default function Register({ title, subtitle, buttonText }) {
    return (
        <div>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className="text-xs">{subtitle}</p>
            <div className='flex flex-col space-y-3 mt-2'>
                <TextField id="standard-basic" label="Digite seu nome" variant="standard" />
                <TextField id="standard-basic" label="Digite seu email" variant="standard" />
                <TextField id="standard-basic" label="Digite sua senha" variant="standard" />
            </div>

            <button className='bg-[#3b82f6] text-white p-1 w-32 mt-5 rounded-xl transition-all duration-200 hover:bg-[#5a92ec] hover:scale-105'>{buttonText}</button>

        </div>
    )
}