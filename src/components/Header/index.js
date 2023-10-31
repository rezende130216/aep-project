import logo from  '../../assets/logo.jpg'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {AuthContext} from "../../contexts/auth";

export default function Header() {

    const {user} = useContext(AuthContext);
    return (
        <div>
            <div>
                <img src={user.avatarUrl === null ? logo : user.avatarUrl} alt="photo user"/>
            </div>
        </div>
    )
}