import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authservice from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  
  const [loading,setloading]=useState(true);

  const dispatch=useDispatch();

  useEffect( ()=>  {
    authservice.getCurrentUser()
    .then((userData)=>{
      if(userData)
      {
        dispatch(login({userData}));
      }
      else{
        dispatch(logout());
      }
    })

    .finally(()=>setloading(false));

  } ,[])

  if(!loading)
  {
    return (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>

          <Header/>
        
           TODO: <Outlet/>

    
          <Footer/>

        </div>

      </div>
    )
  }
  else{
    return null;
  }
}

export default App
