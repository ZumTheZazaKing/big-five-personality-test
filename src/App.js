import { lazy, Suspense, useReducer } from 'react';
import { Routes, HashRouter, Route } from 'react-router-dom';
import { Context } from './context';
import Loading from './Loading';
import quizData from './quizData.json'

const Main = lazy(() => import('./pages/Main').then(module => ({default:module.Main})))
const Quiz = lazy(() => import('./pages/Quiz').then(module => ({default:module.Quiz})));
const Results = lazy(() => import('./pages/Results').then(module => ({default:module.Results})))

function App() {

  const initialState = {
    questions:quizData.questions,
    number:0,
    eScore:20,
    aScore:14,
    cScore:14,
    nScore:38,
    oScore:8,
    maxQuestions:quizData.questions.length
  }

  const reducer = (state, action) => {
    switch(action.type){
      case 'NEXT_QUESTION':
        return ({...state, number: state.number + 1})

      case "STORE_E_VALUE":
        return ({...state, eScore: action.payload})

      case "STORE_A_VALUE":
        return ({...state, aScore: action.payload})

      case "STORE_C_VALUE":
        return ({...state, cScore: action.payload})

      case "STORE_N_VALUE":
        return ({...state, nScore: action.payload})

      case "STORE_O_VALUE":
        return ({...state, oScore: action.payload})

      case "RESET":
        return initialState;

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HashRouter>
      <div className="App">
        <Context.Provider value={{state, dispatch}}>
          <Suspense fallback={<Loading/>}>
            <Routes>

              <Route path='/' element={<Main/>}/>
              <Route path='/quiz/:number' element={<Quiz/>}/>
              <Route path='/results' element={<Results/>}/>

            </Routes>
          </Suspense>
        </Context.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
