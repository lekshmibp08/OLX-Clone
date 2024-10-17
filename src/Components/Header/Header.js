import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import avatar from '../../assets/avatar_4.png'
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContex, FirebaseContext } from '../../store/Context';
import { SearchContext } from '../../store/SearchContext';
import UserProfile from '../UserProfile/UserProfile';

function Header() {
  const {user} = useContext(AuthContex)
  const {firebase} = useContext(FirebaseContext)
  const {searchQuery, setSearchQuery} = useContext(SearchContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()


  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState); 
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search/>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              onChange={(e) => {
                setSearchQuery(e.target.value)
              }}
              type="text"
              value={searchQuery}
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          { user ? (
          <div onClick={toggleDropdown}
            className="profile" style={{cursor:'pointer'}}>
            <img src={avatar} alt="User" style={{width:56}} />
            <Arrow></Arrow>
            {dropdownOpen && <UserProfile/>}
          </div>
            
          ) : (

          <span
            style={{cursor:'pointer'}}
            onClick={() => {
              if(!user) {
                navigate('/login')
              }
            }}
          >
            Login
            <hr />
          </span>
          )
          }

        </div>

        <div className="sellMenu"
          onClick={() => {
            if(user) navigate('/create')
            else navigate('/login')
          }}
        >
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
