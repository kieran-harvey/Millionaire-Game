import { useEffect, useState,useMemo } from 'react';
import './app.css';
import { Trivia } from './components/Trivia';
import Timer from './components/Timer';
import { Start } from './components/Start';

function App() {

  const data = [
    {
        id:1,
        question:'What year did the Titanic sink in the Atlantic Ocean on 15 April, on its maiden voyage from Southampton?',
        answers:[
            {
                text:'1912',
                correct:true
            },
            {
                text:'1913',
                correct:false
            },
            {
                text:'1914',
                correct:false
            },
            {
                text:'1915',
                correct:false
            },
        ]
    },
  
    {
        id:2,
        question:'What is the title of the first ever Carry On film made and released in 1958?',
        answers:[
            {
                text:'Carry on 1 ',
                correct:false
            },
            {
                text:'Carry on Sergeant',
                correct:true
            },
            {
                text:'Carry on 2',
                correct:false
            },
            {
                text:'Carry on 3',
                correct:false
            },
        ]
    },
  
    {
        id:3,
        question:'What is the name of the biggest technology company in South Korea?',
        answers:[
            {
                text:'Nokia',
                correct:false
            },
            {
                text:'Apple',
                correct:false
            },
            {
                text:'Samsung',
                correct:true
            },
            {
                text:'Xiaomi',
                correct:false
            },
        ]
    }
  ];

  const [questionNumber,setQuestionNumber] = useState(1);
  const [username,setUsername] = useState(null);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState('0');
  const moneyPyramid = useMemo(() =>
    [
      {id:1,amount:100},
      {id:2,amount:200},
      {id:3,amount:300},
      {id:4,amount:400},
      {id:5,amount:500},
      {id:6,amount:1000},
      {id:7,amount:5000},
      {id:8,amount:8000},
      {id:9,amount:16000},
      {id:10,amount:32000},
      {id:11,amount:125000},
      {id:12,amount:250000},
      {id:13,amount:500000},
      {id:14,amount:720000},
      {id:15,amount:1000000},
    ].reverse(),
  [])


  useEffect(()=>{
    questionNumber > 1 && setEarned(moneyPyramid.find((m)=>m.id === questionNumber-1).amount)
  },[moneyPyramid,questionNumber])

  return (
    <div className="app">
      {username ? (
        <>
              <div className='main'>
        {stop ? (
        <>
        <h1 className='endText'>You won:{earned}€</h1>
        </>
         ) : (         
        <>
        <div className='top'>
          <div className='timer'>
            <Timer setStop={setStop} questionNumber = {questionNumber}/>
          </div>
        </div>
        <div className='bottom'>
          <Trivia 
            data={data} 
            setStop={setStop}  
            questionNumber={questionNumber} 
            setQuestionNumber={setQuestionNumber}
          />
        </div>
        </> 
         )
        }

      </div>
      <div className='pyramid'>
        <ul className='moneyList'>
          {moneyPyramid.map((m)=>(
          <li className={questionNumber === m.id ? "moneyListItem active":"moneyListItem"} key={m.id}>
            <span className='moneyListNumber'>{m.id}.</span>
            <span className='moneyListAmount'>{m.amount} €</span>
          </li>
          ))}
        </ul>
      </div>
        </>
      ) : <Start setUsername={setUsername}/>}

    </div>
  );
}



export default App;
