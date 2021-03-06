import React, { useEffect, useRef, useState } from 'react';
import wrong from '../Assets/cancel.png';
import correct from '../Assets/check-mark.png';
import { useSelector } from 'react-redux';
import Results from '../API/GET-results';
import avatar from '../Assets/avatar.png';
import correctAudio from '../Assets/audio/correct.mp3';
import wrongAudio from '../Assets/audio/wrong.mp3';

export const QuestionCard = (props) => {
  return(
  <>
      <span className='hidden lg:flex flex-col items-center lg:absolute -top-10'>
          <div className='grid place-items-center h-[5rem] aspect-square rounded-full bg-[#0084A4]'>
            <p className='text-2xl font-bold text-white'>00:{props.counter > 9 ? props.counter : '0'+ props.counter}</p>
          </div>
        </span>
        <p className='text-2xl font-semibold text-[#0084A4]'>ROUND {props.round}</p>
        <p className='font-medium'>{props.quiz}</p>
        <span className='w-full flex flex-col gap-2 items-center lg:grid lg:grid-cols-2 lg:place-items-center'>
          {
            props.options.map((option, index) => 
                <label key={option.id} htmlFor={option.id} className=' w-3/4 lg:w-[95%] flex flex-row items-center justify-center rounded-full h-[3.5rem] mt-1 bg-[#F2F2F2] shadow-md  hover:cursor-pointer'>
                  <input className='absolute'
                        id={option.id} 
                        type='radio' 
                        name={props.round}
                        value={option.id}
                        onChange={props.setAnswer} />
                  <span className='text-base text-black font-bold rounded-full flex flex-col border border-black w-full h-full items-center opacity-60 option'>
                    <p className='m-auto'>{option.text}</p>
                  </span>
                </label>)
          }
          {/* POPUP */}
          <p className={`${props.pop ? 'flex' : 'hidden'} text-xl col-span-2 mx-auto text-center text-[#0084A4]`}>Wait for the other participants to answer</p>
        </span>
  </>
  )
}

export const CorrectAnswer = (props) => {
  const [wait, setWait] = useState(props.timer);
  const audioRef = useRef();
  const mute = useSelector(state => state.mute.mute)

  useEffect(() => {
    const interval = setInterval(() => setWait(prev => prev > 0 ? prev - 1: 0), 1000);
    document.getElementById('comp-music').play();
    return () => clearInterval(interval);
  },[])

  const mutedFunc = () => {
    if(mute === true){
      let state = {
        muted: true
      }
      return state
    } else {
      let state = {
        muted: false
      }
      return state
    }
  }

  return (
    <div className='relative w-[75%] lg:w-[25rem] lg:aspect-square bg-white pt-10  p-4 mb-8 gap-2 rounded-2xl flex flex-col items-center mx-auto'>
      <span className='hidden lg:flex flex-col items-center lg:absolute -top-10'>
          <div className='grid place-items-center h-[5rem] aspect-square rounded-full bg-[#0084A4]'>
            <p className='text-2xl font-bold text-white'>00:{wait > 9 ? wait : '0'+ wait}</p>
          </div>
        </span>
        <p className='text-3xl text-[#0084A4]'>ROUND {props.round}</p>
        <p className='text-xl'>Your Answer is Correct</p>
        <img src={correct} alt='' className='w-[7rem] aspect-square'/>
        <p className='text-xl font-bold mt-4'>Next Question</p>
        <p className='text-4xl font-bold'>00:{wait > 9 ? wait : '0'+ wait}</p>
        <audio ref={audioRef} id='comp-music' autoPlay controlsList='nodownload' hidden {...mutedFunc}>
            <source src={correctAudio}/>
        </audio>
    </div>
  )
}

export const WrongAnswer = (props) => {
  const [wait, setWait] = useState(props.timer);
  const audioRef = useRef();
  const mute = useSelector(state => state.mute.mute)

  useEffect(() => {
    const interval = setInterval(() => setWait(prev => prev > 0 ? prev - 1: 0), 1000);
    document.getElementById('comp-music').play();
    return () => clearInterval(interval);
  },[]);

  const mutedFunc = () => {
    if(mute === true){
      let state = {
        muted: true
      }
      return state
    } else {
      let state = {
        muted: false
      }
      return state
    }
  }

  return (
    <div className='relative w-[75%] lg:w-[25rem] lg:aspect-square bg-white pt-10 p-4 mb-8 gap-2 rounded-2xl flex flex-col items-center mx-auto'>
      <span className='hidden lg:flex flex-col items-center lg:absolute -top-10'>
          <div className='grid place-items-center h-[5rem] aspect-square rounded-full bg-[#0084A4]'>
            <p className='text-2xl font-bold text-white'>00:{wait > 9 ? wait : '0'+ wait}</p>
          </div>
        </span>
        <p className='text-3xl text-[#0084A4]'>ROUND {props.round}</p>
        <p className='text-xl'>Your Answer is Wrong</p>
        <img src={wrong} alt='' className='w-[4.5rem] aspect-square'/>
        <p className='text-2xl font-bold mt-4'>Next Question</p>
        <p className='text-4xl font-bold'>00:{wait > 9 ? wait : '0'+ wait}</p>
        <audio ref={audioRef} id='comp-music' autoPlay controlsList='nodownload' hidden {...mutedFunc}>
          <source src={wrongAudio}/>
        </audio>
      </div>
  )
}
export const MiniLeaderboard = () => {
  const { getCurrentResults } = Results();
  const currentResults = useSelector(state => state.results.results);
  const [ctrl] = useState();

  useEffect(() => {
    getCurrentResults();

    //eslint-disable-next-line
  }, [ctrl])

  useEffect(() => {
    const interval = setInterval(() => getCurrentResults(),
    2000);

    return () => clearInterval(interval)

    //eslint-disable-next-line
  }, [])

  return (
    <div className='w-[90%] lg:w-[45%] bg-white  p-4 mb-8 flex flex-col items-center mx-auto'>
        <p className='text-3xl mb-8 text-[#36413E]'>Leader Board</p>
        <div className='w-[90%] grid grid-cols-2 border-b border-b-gray-400 border-t border-t-gray-400 py-1'>
          <p>Player</p>
          <p className='justify-self-end'>Score</p>
        </div>
        {
          currentResults.map((item, index) => <div key={item.user_name} className='w-[90%] grid py-2 grid-cols-2 border-b border-b-gray-400 border-t border-t-gray-400 font-bold'>
            <span className='flex flex-row gap-2 items-center'>
              <p className='font-medium'>{index + 1}</p>
              <img alt='' className='w-[2.5rem] h-[2.5rem] rounded-full object-cover' src={avatar}/>
              <p>{item.user_name}</p>
            </span>
            <p className='justify-self-end place-self-center'>{item.user_score}</p>
          </div>)
        }
        
      </div>
  )
}



