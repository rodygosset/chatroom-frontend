import { faArrowRightFromBracket, faComments, faMessage } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import Button from "./button";
import styles from "@styles/components/header.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserCard from "./header/user-card";
import Hamburger from "./header/hamburger";
import { useState } from "react";
import { ThreadPreview } from "@conf/data-types";
import ThreadList from "./thread-list";

interface Props {
    currentThreadID?: string;
    setCurrentThreadID: (newID?: string) => void;
    initThreads: ThreadPreview[];
}

const Header = (
    {
        currentThreadID,
        setCurrentThreadID,
        initThreads
    }: Props
) => {

    // state
    
    const [showMobileNav, setShowMobileNav] = useState(false)

    const [showThreads, setShowThreads] = useState(true)

    // utils

    const getMobileNavClassNames = () => {
        let classNames = styles.mobileNav + " "
        classNames += showMobileNav ? styles.show : styles.hide
        return classNames
    }

    const getThreadListClassNames = () => {
        let classNames = styles.threadList + " "
        classNames += showThreads ? styles.show : styles.hide
        return classNames
    }

    // render

    return (
        <header className={styles.header}>
            <p className={styles.logoContainer}><FontAwesomeIcon icon={faMessage}/> ChatRoom</p>
            {/* Only on mobile */}
            <Button
                className={styles.showThreadsButton}
                icon={faComments}
                role="tertiary"
                onClick={() => setShowThreads(!showThreads)}>
                Threads
            </Button>
            <nav>
                <UserCard/>
                <Button 
                    className={styles.logOutButton}
                    icon={faArrowRightFromBracket}
                    role="tertiary"
                    hasPadding
                    onClick={signOut}>
                        Sign out
                </Button>
            </nav>
            {/* only visible on mobile */}
            <Hamburger 
                className={styles.navIcon}
                onClick={() => setShowMobileNav(!showMobileNav)}
            />
            <nav className={getMobileNavClassNames()}>
                <UserCard/>
                <Button 
                    className={styles.logOutButton}
                    icon={faArrowRightFromBracket}
                    role="tertiary"
                    hasPadding
                    onClick={signOut}>
                        Sign out
                </Button>
            </nav>
            <ThreadList 
                className={getThreadListClassNames()}
                hide={() => setShowThreads(false)}
                currentThreadID={currentThreadID}
                setCurrentThreadID={setCurrentThreadID}
                initThreads={initThreads}
            />
        </header>
    )
}

export default Header;