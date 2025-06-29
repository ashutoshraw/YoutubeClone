import React, { useState } from 'react'
import './Home.css'
import SideBar from '../../components/SideBar.jsx/SideBar'
import Feed from '../../components/Feed/Feed'
const Home = ({sidebar}) => {
  const [category,setCategory]=useState(0)
  return (
   <>
   <SideBar sidebar={sidebar} category={category} setCategory={setCategory}/>
   <div className={`container ${sidebar?"":'large-container'}`}>
    <Feed category={category}/>
   </div>
   </>
  )
}

export default Home