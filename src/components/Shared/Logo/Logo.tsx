"use client"
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export const Logo = ({whereUse}: Readonly<{whereUse: string}>) =>{
    const {theme} = useTheme();
    const width = whereUse === 'login' ? 232 : 117
    const height = whereUse === 'login' ? 70 : 35

    if (theme === 'dark') {
        return(
            <Image 
            src='/images/logo-dark.png'
            alt='Logo'
            width={width}
            height={height}
            />
        )    
    }else{
        return(
            <Image 
                src='/images/logo-light.png'
                alt='Logo'
                width={width}
                height={height}
            />
        )
    }
}