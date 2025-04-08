'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import styles from '../Navbar.module.scss';
import { links } from '@/constants/LinksNavbar';

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