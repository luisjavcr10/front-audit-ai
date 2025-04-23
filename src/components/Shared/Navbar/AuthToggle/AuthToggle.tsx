"use client";
import styles from './AuthToggle.module.scss';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

export const AuthToggle = () =>{
    const { handleLogout } = useAuth();
    const [open, setOpen] = useState<Boolean>(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleClickOutside = () => {
        handleLogout();
    };

    return(
        <>
            <div 
                onClick={() => setOpen(!open)}
                className={styles.AuthToggle}
                aria-label='Toggle Auth'
            >
                <FaUserCircle className={styles.AuthToggle__Icon}/>
                {open && 
                <div ref={menuRef} className={styles.AuthToggle__ToggleMenu}>
                    <button 
                        className={styles.AuthToggle__ToggleMenu__Item}
                        onClick={handleClickOutside}
                    >
                        <IoLogOut className={styles.AuthToggle__ToggleMenu__Item__Icon}/>
                        Logout
                    </button>
                </div>
                }
            </div>
        </>
    )
}