import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Results from '../API/GET-results';
import avatar from '../Assets/avatar.png';
import fireworks from '../Assets/fireworks.png';

const Winner = () => {
  const { getLeaderboards } = Results();
  const leaderboard = useSelector(state => state.results.leaderboard);
  const comp = useSelector(state => state.competition.currentCompetition);
  const [user, setUser] = useState();
  const [winnerCard, setWinnerCard] = useState(false);
  const {results, winner} = leaderboard;
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser)
    getLeaderboards();
    
    //eslint-disable-next-line
  },[]);

  useEffect(() => {
    if(typeof winner !== 'undefined' && typeof user !== 'undefined'){
      if(winner.length === 1){
        if(winner[0].user_name === user.first_name){
          setWinnerCard(true)
        }
      }
    }

    //eslint-disable-next-line
  }, [winner])

  console.log(winner)
  

  return (
    <div className='flex pt-4 lg:pt-12 bg-[#E8E8E8] flex-col w-full flex-grow gap-4 items-center'>
      <span className='flex items-center flex-col text-white'>
        {
          winnerCard
            ? <p className='text-3xl text-[#36413E]'>UEFA EURO Cup Winner</p> 
            : <p className='text-3xl text-[#36413E]'>UEFA EURO Cup</p>
        }
        <p className='text-3xl font-bold text-[#36413E]'>Your Result</p>
      </span>
      
      {
        winnerCard && <div className='relative w-[70%] lg:w-[25rem] lg:aspect-square bg-[#FC9228] shadow-xl rounded-2xl py-5 text-white text-lg items-center flex flex-col'>
        <img alt='' src={avatar} className='py-5'/>
        <img alt='' src={fireworks} className='absolute left-3'/>
        <img alt='' src={fireworks} className='absolute right-3 top-4 scale-125'/>
        <img alt='' src={fireworks} className='absolute top-28 left-4 scale-75'/>
        <p className='text-2xl'>Congratulations!</p>
        <p className='text-2xl'>you are a winner</p>
        <p className='text-2xl'>You win ${comp.price}</p>
      </div>
      }

      <div className='gap-3 w-[90%] lg:w-[55%] pb-10 p-4 mb-4 flex flex-col items-center mx-auto'>
        {
          results?.map((item, index) => <div key={item.user_name} className={`${item.user_name === user?.first_name ? 'bg-[#bbbaba]' : 'bg-[#D8D8D8]'} w-[90%] lg:w-[70%] grid shadow-md p-4 grid-cols-2 rounded-xl text-xl font-bold place-items-center`}>
            <span className='flex flex-row gap-2 items-center justify-self-start'>
              <p>{index + 1}</p>
              <img alt='' className='w-[2.5rem] h-[2.5rem] rounded-full object-cover shadow-xl' src={avatar}/>
              <p>{item.user_name}</p>
            </span>
            <p className='justify-self-end'>{item.user_score}</p>
          </div>)
        }
      </div>
    </div>
  )
}

export default Winner