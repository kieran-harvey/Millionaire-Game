import React,{useEffect,useState} from 'react'
import useSound from 'use-sound';
import play from '../Sounds/src_sounds_play.mp3'
import correct from '../Sounds/src_sounds_correct.mp3'
import wrong from '../Sounds/src_sounds_wrong.mp3'

export const Trivia = ({data,setStop,questionNumber,setQuestionNumber}) => {
    const [question,setQuestion] = useState(null);
    const [selectedAnswer,setSelectedAnswer] = useState(null);
    const [className,setClassName] = useState('answer');
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);

    // useEffect(()=>{
    //     letsPlay();
    // },[letsPlay])

    const delay = (duration,callback)=>{
        setTimeout(()=>{
            callback();
        },duration)
    }

    const handleClick = (a) =>{
        setSelectedAnswer(a);
        setClassName('answer active');
        delay(3000,()=>
            setClassName(a.correct ? 'answer correct':'answer wrong')
        );
        delay(5000,()=>{
            if(a.correct){
                correctAnswer();
                delay(1000,()=>setQuestionNumber((prev)=> prev+1))
            }else{
                wrongAnswer();
                delay(1000,()=>setStop(true))
                
            }
        });
    }

    useEffect(() => {
       setQuestion(data[questionNumber-1])
    },[data,questionNumber]);
    
    return (
        <div className='trivia'>
            <div className='question'>{question?.question}</div>
                <div className='answers'>
                    {question?.answers.map((a)=>
                        <div key={a.text} className={selectedAnswer === a ? className:'answer'} onClick={()=>handleClick(a)}>{a.text}</div>
                    )}
                    

                </div>
            
        </div>
    )
}
