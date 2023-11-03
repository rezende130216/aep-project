import {useContext} from 'react'
import logo from '../../assets/logo.jpg'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/auth'
import {FiHome,FiUser,FiFlag} from 'react-icons/fi'
import './header.css'

export default function Header() {
    const {user} = useContext(AuthContext);
    return (
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? logo : user.avatarUrl} alt="photo user" />
            </div>
            <Link to="/dashboard">
                <FiHome color="#FFF" size={24} />
                Prompts
            </Link>
            <Link to="/dashboard">
                <FiFlag color="#FFF" size={24} />
                Saved
            </Link>
            <Link to="/profile">
                <FiUser color="#FFF" size={24} />
                Profile
            </Link>
        </div>
    )
}