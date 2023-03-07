import Head from "next/head"
import { useState } from "react";

interface Props {
    className?: string;
    onClick: () => void;
}

const Hamburger = (
    {
        className,
        onClick
    }: Props
) => {

    const [isActive, setIsActive] = useState(false)

    // utils

    const getClassNames = () => {
        let classNames = "hamburger hamburger--minus" 
        classNames += isActive ? " is-active" : ''
        classNames += className ? ' ' + className : ''
        return classNames
    }

    // handlers

    const handleClick = () => {
        setIsActive(!isActive)
        onClick()
    }


    // render

    return (
        <>
            <Head>
                <link href="dist/hamburgers.min.css" rel="stylesheet" />
            </Head>
            <button className={getClassNames()} type="button" onClick={handleClick}>
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button> 
        </>
          
    )
}

export default Hamburger