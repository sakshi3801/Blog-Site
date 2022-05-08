import React from 'react'
import './Header.css'
import img from '../images/img2.jpg'

export default function Header() {
    return (
        <div className='header'>
            <div className="headerTitles">
                <span className='headerTitleSm'>React & Node</span>
                <span className='headerTitleLg'>Blog</span>
            </div>
            <img className='headerImg' src="https://i.picsum.photos/id/1057/6016/4016.jpg?hmac=RjPyzbGq_MxSbghhfa1iVykXTskk9IISuzavny11_lI" alt='' />
        </div>
    )
}
