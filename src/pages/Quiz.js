import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../context";

export const Quiz = () => {

    const navigate = useNavigate();
    const { number } = useParams();
    const { state, dispatch } = useContext(Context)

    const [selected, setSelected] = useState(null);

    const question = state.questions[number].question;
    const category = state.questions[number].category;
    const operator = state.questions[number].operator;

    const answers = [
        {"text":"Disagree", "value":1},
        {"text":"Slightly Disagree", "value":2},
        {"text":"Not sure", "value":3},
        {"text":"Slightly agree","value":4},
        {"text":"Agree","value":5}
    ]

    console.log(state.number)
    console.log(state.maxQuestions)

    const nextQuestion = () => {
        storeValue();
        setSelected(null)
        if(parseInt(number)+1 === state.maxQuestions){
            navigate('/results')
        }else{
            dispatch({type:"NEXT_QUESTION"})
            navigate(`/quiz/${parseInt(number)+1}`)
        }
    }

    const storeValue = () => {
        if(operator === "+"){
            switch(category){
                case "e":dispatch({type:"STORE_E_VALUE",payload:state.eScore+selected});break;
                case "a":dispatch({type:"STORE_A_VALUE",payload:state.aScore+selected});break;
                case "c":dispatch({type:"STORE_C_VALUE",payload:state.cScore+selected});break;
                case "n":dispatch({type:"STORE_N_VALUE",payload:state.nScore+selected});break;
                case "o":dispatch({type:"STORE_O_VALUE",payload:state.oScore+selected});break;
            }
        }else{
            switch(category){
                case "e":dispatch({type:"STORE_E_VALUE",payload:state.eScore-selected});break;
                case "a":dispatch({type:"STORE_A_VALUE",payload:state.aScore-selected});break;
                case "c":dispatch({type:"STORE_C_VALUE",payload:state.cScore-selected});break;
                case "n":dispatch({type:"STORE_N_VALUE",payload:state.nScore-selected});break;
                case "o":dispatch({type:"STORE_O_VALUE",payload:state.oScore-selected});break;
            }
        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center px-2 bg-slate-300">
            <h1 className="text-3xl font-bold text-center">
                {parseInt(number)+1}.<br/>
                {question}
            </h1>
            <br/>
            <div className=" w-4/5 md:w-3/5">
                {answers.map((answer,i) => {
                    return (
                        <p 
                            className={`
                                text-xl cursor-pointer bg-cyan-600 
                                text-center p-2 my-5 text-white font-medium 
                                rounded-lg shadow-lg shadow-black 
                                ${selected === i+1 ? "shadow-cyan-600" : ""}
                                transition-all`}
                            key={i}
                            onClick={() => setSelected(answer.value)}
                            title={answer.value}
                        >
                            {answer.text}
                        </p>
                    )
                })}
            </div>
            <br/>
            <p 
                className={`
                    font-bold text-xl 
                    ${selected ? "cursor-pointer text-black" : "cursor-default text-slate-500"}
                `}
                onClick={() => {
                    if(!selected)return;
                    nextQuestion()
                }}
            >
                    Next
            </p>
        </div>
    )
}