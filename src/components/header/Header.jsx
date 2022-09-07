import React, { useEffect, useRef } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './header.scss';

import logo from '../../assets/movie-stock-logo.png';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    }

];

const Header = () => {

    const { pathName } = useLocation(); //return location object hiện tại, lấy thông tin từ URL hiện tại
    const headerRef = useRef(null); //cố định giá trị giữa các lần render 

    const active = headerNav.findIndex(e => e.path === pathName);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, [])

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/">MoviesS</Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((value, index) => (
                            <li key={index} className={`${index === active ? 'active' : ''}`}>
                                <Link to={value.path}>
                                    {value.display}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Header;