"use client";
import styles from './ToggleMenu.module.scss'
import { ItemToggleMenu } from './ItemToggleMenu';
import { useState, useRef, useEffect } from 'react';

import { IoMenu } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { IoDownload } from "react-icons/io5";
import { FaRegFileCode } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineTranslate, MdOutlineLightMode } from "react-icons/md";

const itemsToAnyPage=[
    { icon: <GoHomeFill className={styles.ToggleMenu__Item__Icon}/>, title: 'Home', href: '/' },
    { icon: <IoDownload className={styles.ToggleMenu__Item__Icon}/>, title: 'LoadFile', href: '/load-file' },
    { icon: <FaRegFileCode className={styles.ToggleMenu__Item__Icon}/>, title: 'Prompt', href: '/prompt' },
    { icon: <FaUser className={styles.ToggleMenu__Item__Icon}/>, title: 'Sing In', href: '/login' },
    { icon: <MdOutlineLightMode className={styles.ToggleMenu__Item__Icon}/>, title: 'Light mode', href: '' },
    { icon: <MdOutlineTranslate className={styles.ToggleMenu__Item__Icon}/>, title: 'Translate', href: '' }
];

export const ToggleMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
          if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
            setIsOpen(false);
          }
        }
  
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div 
                className={styles.Menu}
                onClick={handleToggleMenu}
            >
                <IoMenu className={styles.Menu__Icon}/>
            </div>
            {/* Toggle Menu */}
            <div ref={menuRef} className={`${styles.ToggleMenu} ${
              isOpen ? styles.active : ''
            }`}>
                {itemsToAnyPage.map((item, index) => (
                    <ItemToggleMenu 
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        href={item.href}
                    />
                ))}
            </div>
        </>
        
    )
}