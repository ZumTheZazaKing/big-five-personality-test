import { useNavigate } from "react-router-dom"

export const Main = () => {

    const navigate = useNavigate();

    return (
        <div className="h-screen flex items-center justify-center flex-col bg-slate-300">
            <h1 className="text-3xl font-bold">Big Five Personality Test</h1>
            <br/>
            <div>
                <p 
                    className="cursor-pointer bg-cyan-600 px-4 py-2 rounded-lg text-white font-medium"
                    onClick={() => navigate('/quiz/0')}
                >
                    Start
                </p>
            </div>
        </div>
    )
}