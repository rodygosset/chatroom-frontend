import { faArrowRightFromBracket, faMessage } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import Button from "./button";
import styles from "@styles/components/header.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserCard from "./header/user-card";

const Header = () => {


    // render

    return (
        <header className={styles.header}>
            <p className={styles.logoContainer}><FontAwesomeIcon icon={faMessage}/> ChatRoom</p>
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
        </header>
    )
}

export default Header;