import TextField from '@mui/material/TextField';
import logo from '../../assets/logo.png'

export default function Login({ onForgetPassword, onRegister, title, subtitle, forgetPassword, buttonText }) {

    return (
        <div className="flex flex-col w-72">
            <div className='flex items-center mb-4'>
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <div className='flex flex-col ml-3'>
                    <h1 className='text-base'>Central do crediário</h1>
                </div>
            </div>

            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-xs'>{subtitle}{' '}
                <span
                    className='font-semibold text-blue-500 cursor-pointer'
                    onClick={onRegister}
                >
                    crie uma conta.
                </span>
            </p>
            <div className='flex flex-col space-y-3 mt-2'>
                <TextField id="standard-basic" label="Email" variant="standard" />
                <TextField id="standard-basic" label="Senha" variant="standard" />
            </div>
            <p className='text-xs mt-2 font-semibold'>{' '}<span className='font-semibold text-blue-500 cursor-pointer' onClick={onForgetPassword} >{forgetPassword}</span></p>

            <button className='bg-[#3b82f6] text-white p-1 min-w-screen mt-5 rounded-xl transition-all duration-200 hover:bg-[#5a92ec] hover:scale-105'>{buttonText}</button>
        </div>
    )
}