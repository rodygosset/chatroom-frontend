import { getUserFullName } from "@conf/data-types"
import { MySession } from "@conf/utility-types"
import styles from "@styles/components/header/user-card.module.scss"
import { useSession } from "next-auth/react"
import Image from "next/image"

const UserCard = () => {

    const session = useSession().data as MySession | null

    return (
        <div className={styles.container}>
            <div className={styles.illustrationContainer}>
                <Image 
                    quality={100}
                    src={'/images/user.svg'} 
                    alt={"User"} 
                    priority
                    fill
                    style={{ 
                        objectFit: "contain", 
                        top: "auto"
                    }}
                />
            </div>
            {
                session ?
                <div className={styles.userInfo}>
                    <h5>{getUserFullName(session?.user)}</h5>
                    <p>Online</p>
                </div>
                :
                <></>
            }

        </div>
    )
}


export default UserCard