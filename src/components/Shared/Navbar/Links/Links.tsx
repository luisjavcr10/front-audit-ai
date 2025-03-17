'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import styles from '../Navbar.module.scss';

const links = [
  { path: '/', label: 'Home' },
  { path: '/load-file', label: 'LoadFile' },
  { path: '/prompt', label: 'Prompt' }
];

export const Links = () => {
  const pathname = usePathname(); 

  return (
    <ul>
      {links.map((link) => (
        <li key={link.path}>
          <Link
            className={`${styles.Navbar__Link} ${
              pathname === link.path ? styles.active : ''
            }`}
            href={link.path}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};