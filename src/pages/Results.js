import { useContext } from 'react';
import { Context } from '../context';
import { useNavigate } from 'react-router-dom';

export const Results = () => {

    const { state, dispatch } = useContext(Context);
    const navigate = useNavigate();

    const back = () => {
        dispatch({type:"RESET"})
        navigate("/")
    }

    const takeAgain = () => {
        dispatch({type:"RESET"})
        navigate(`/quiz/${state.number}`)
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-300">
            <h1 className='text-2xl font-bold'>Results</h1>
            <div>
                <p className='text-xl'><span className='font-bold'>Extroversion:</span> {state.eScore}</p>
                <p className='text-xl'><span className='font-bold'>Agreeableness:</span> {state.aScore}</p>
                <p className='text-xl'><span className='font-bold'>Conscientiousness:</span> {state.cScore}</p>
                <p className='text-xl'><span className='font-bold'>Neuroticism:</span> {state.nScore}</p>
                <p className='text-xl'><span className='font-bold'>Openness:</span> {state.oScore}</p>
            </div>
            <br/>
            <div className='flex items-center justify-center'>
                <p onClick={() => back()} className='mx-2 text-lg font-medium cursor-pointer'>
                    Back
                </p>
                <p onClick={() => takeAgain()} className='mx-2 text-lg font-medium bg-cyan-600 px-2 py-1 rounded-lg text-white cursor-pointer'>
                    Take again
                </p>
            </div>
        </div>
    )
}