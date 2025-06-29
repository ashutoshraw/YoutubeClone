import React from 'react'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search.png'
import uploadIcon from '../../assets/upload.png'
import moreIcon from '../../assets/more.png'
import notificationIcon from '../../assets/notification.png'
import profileIcon from '../../assets/jack.png'
import './NavBar.css'
const NavBar = ({setSidebar}) => {
  return (
    <nav className='flex-div'>
        <div className="nav-left flex-div">
            <img className='menu-icon' src={menu_icon} alt="menu-icon" onClick={()=>{
                setSidebar(prevState=>prevState===false?true:false)
            }}/>
            <img className='logo' src={logo} alt="" />
        </div>
        <div className="nav-middle flex-div">
            <div className="search-box flex-div">
                <input type="text" placeholder='search' />
            <img src={searchIcon} alt="" />
            </div>
            
            
        </div>
        <div className='nav-right flex-div'>
            <img src={uploadIcon} alt="" />
            <img src={moreIcon} alt="" />
            <img src={notificationIcon} alt="" />
            <img className='user-icon' src={profileIcon} alt="" />
        </div>
    </nav>
  )
}

export default NavBar