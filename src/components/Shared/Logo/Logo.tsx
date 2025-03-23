"use client"
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export const Logo = ({whereUse}: Readonly<{whereUse: string}>) =>{
    const {theme} = useTheme();
    
    const dimensions = {
        login: { width: 232, height: 70 },
        navbar: { width: 117, height: 35 },
        register: { width: 474, height: 142 }
    };

    const width = dimensions[whereUse as keyof typeof dimensions]?.width ?? 117;
    const height = dimensions[whereUse as keyof typeof dimensions]?.height ?? 35;

    if (theme === 'dark') {
        return(
            <Link href='/'>
                <Image
                src='/images/logo-dark.png'
                alt='Logo'
                width={width}
                height={height}
                quality={80}
                />
            </Link>
        )    
    }else{
        return(
            <Link href='/'>
                <Image
                src='/images/logo-light.png'
                alt='Logo'
                width={width}
                height={height}
                quality={80}
                />
            </Link>
        )
    }
}