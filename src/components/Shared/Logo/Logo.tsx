"use client"
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

type LogoProps = {
    whereUse: 'login' | 'navbar' | 'register';
};

type DimensionsType = {
    [K in LogoProps['whereUse']]: {
        width: number;
        height: number;
    };
};

export const Logo = ({ whereUse }: Readonly<LogoProps>) => {
    const { theme } = useTheme();
    
    const dimensions: DimensionsType = {
        login: { width: 232, height: 70 },
        navbar: { width: 117, height: 35 },
        register: { width: 474, height: 142 }
    };

    const { width, height } = dimensions[whereUse] ?? dimensions.navbar;
    const logoSrc = `/images/logo-${theme}.png`;

    return (
        <Link href='/'>
            <Image
                src={logoSrc}
                alt='Logo'
                width={width}
                height={height}
                quality={80}
                priority 
            />
        </Link>
    );
};
