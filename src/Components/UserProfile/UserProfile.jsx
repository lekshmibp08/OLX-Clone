import React, {useContext} from 'react'
import { AuthContex } from '../../store/Context'
import { FirebaseContext } from '../../store/Context'
import avatar from '../../assets/avatar_4.png'
import './UserProfile.css'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
    const {user, setUser} = useContext(AuthContex)
    const {firebase} = useContext(FirebaseContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
          setUser(null); // Clear user context
          navigate('/login');
        });
      };
  return (
    <div className="user-profile">
        <div className="user-profile-details">
            <div className="user-info">
              <img src={avatar} alt="User Profile" />
              <a>{user.displayName}</a>
            </div>
            <button>View and edit profile</button>
        </div>
      
        <p>We are built on trust. Help one another to get to know each other better.</p>
        <hr />
        <ul className="add-menu">
            <li>
              <i className="fa fa-heart"></i>
              <span>My ADS</span>
            </li>
            <li>
              <i className="fa fa-calendar"></i>
              <span>Buy Business Packages</span>
            </li>
            <li>
              <i className="fa fa-credit-card"></i>
              <span>Bought Packages & Billing</span>
            </li>
            <hr />
            <li>
              <i className="fa fa-question-circle"></i>
              <span>Help</span>
            </li>
            <li>
              <i className="fa fa-cog"></i>
              <span>Settings</span>
            </li> 
            <hr />
            <li>
              <i className="fa fa-download"></i>
              <span>Install OLX Lite app</span>
            </li>
            <li onClick={handleLogout}>
              <i className="fa fa-arrow-left"></i>
              <span>Logout</span>
            </li>           
        </ul>
    </div>
  )
}

export default UserProfile
