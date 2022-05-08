import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import img3 from '../images/img6.jpg'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Sidebar() {

    const [cats, setCats] = useState([])

    useEffect(()=>{

        const getCats = async ()=>{
            const res = await axios.get("/categories")
            setCats(res.data)
        }

        getCats()

    }, [])

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className='sidebarTitle'>ABOUT ME</span>
                <img className='' src="https://i.picsum.photos/id/104/3840/2160.jpg?hmac=Rv0qxBiYb65Htow4mdeDlyT5kLM23Z2cDlN53YYldZU" alt='' />
                <p>Freely share your ideas, experiences, thoughts and opinions with the world :-)</p>
            </div>
            <div className="sidebarItem">
            <span className='sidebarTitle'>CATEGORIES</span>
            <ul className="sidebarList">
                {cats.map((c)=>(
                    <Link to={`/?cat=${c.name}`} className='link'>
                    <li className='sidebarListItem'>{c.name}</li>
                    </Link>
                ))}
              
            </ul>
            </div>
            <div className="sidebarItem">
            <span className='sidebarTitle'>FOLLOW US</span>
            <div className='sidebarSocial'>
            <i className="sidebarIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>
            <i className="sidebarIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon fab fa-instagram-square"></i>
            </div>
            </div>
        </div>
    )
}
