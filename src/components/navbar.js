import React, { useState } from 'react';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoMenu, IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { IoIosVolumeHigh, IoIosVolumeOff } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setMute } from '../redux/mute-slice';

export const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mute = useSelector(state => state.mute.mute)

  return (
    <div className='sticky z-20 top-0 w-full flex flex-row justify-between items-center p-2 bg-white'>
        <h1 className='text-3xl font-bold text-[#36413E]'>Live Quiz</h1>
        <span className='flex flex-row items-center gap-2'>
          <button onClick={() => dispatch(setMute())}>
            {
              mute === true 
                ? <IoIosVolumeOff className='text-3xl'/>
                : <IoIosVolumeHigh className='text-3xl'/>
            }
          </button>
          <button onClick={() => setOpen(!open)}><IoMenu className='text-3xl'/></button>
        </span>
        <div className={`${ open ? 'h-[242px]' : 'h-0'} w-full z-20 transition-all fixed flex gap-2 overflow-hidden flex-col right-0 top-[3.25rem] bg-white shadow-xl`}>
            <button className='my-1' onClick={() => {navigate('/'); setOpen(!open)}}>HOME</button>
            <button className='my-1' onClick={() => {navigate('/quiz'); setOpen(!open)}}>QUIZZES</button>
            <button className='my-1'>CATEGORY</button>
            <button className='my-1'>MULTIPLAYER</button>
            <button className='my-1'>CONTACT</button>
            <button className='my-1' onClick={() => {
              localStorage.clear();
              setOpen(!open);
              navigate('/signin');
            }}>LOG OUT</button>
        </div>
    </div>
  )
}

export const DesktopNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mute = useSelector(state => state.mute.mute);

     return (
      <div className='w-full flex flex-row justify-between items-center p-2 px-4 bg-white'>
          <h1 className='text-3xl font-bold whitespace-nowrap text-[#36413E]'>Live Quiz</h1>
          <div className='flex gap-8 flex-row text-sm'>
              <button className='my-1' onClick={() => navigate('/')}>HOME</button>
              <button className='my-1' onClick={() => navigate('/quiz')}>QUIZZES</button>
              <button className='my-1'>CATEGORY</button>
              <button className='my-1'>MULTIPLAYER</button>
              <button className='my-1'>CONTACT</button>
          </div>
          <div className='flex flex-row gap-2 items-center'>
              <button onClick={() => dispatch(setMute())}>
                {
                  mute === true 
                    ? <IoIosVolumeOff className='text-3xl'/>
                    : <IoIosVolumeHigh className='text-3xl'/>
                }
              </button>
              <IoSearch/>
              <IoLogoInstagram/>
              <IoLogoTwitter/>
              <IoLogoFacebook/>
          </div>
      </div>
    )
  }
