import FieldContainer from "@components/form-elements/field-container"
import Label from "@components/form-elements/label"
import TextInput from "@components/form-elements/text-input"
import { faMessage, faRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@styles/pages/login.module.scss"
import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { FormEvent, FormEventHandler, useState } from "react"

import { signIn, useSession } from "next-auth/react"
import Button from "@components/button"


const Login: NextPage = () => {

    const router = useRouter()

    let returnUrl = router.query.returnUrl?.toString() || '/';

    // if the return url is /login, change it to the home page
    if(returnUrl == "/login") { returnUrl = '/' }


    // if the user's already authenticated, redirect to returnUrl

    const { status } = useSession()

    if(status == "authenticated") {
        router.push(returnUrl)
    }

    // state

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [signInFailed, setSignInFailed] = useState(false)

    const handleSubmit = async (event: FormEvent | MouseEvent) =>{
        event.preventDefault()
        signIn(
            "credentials", 
            { 
                username: username, 
                password: password, 
                redirect: false
            }
        ).then((response) => {
            if(!response) return
            const { ok } = response
            ok ? router.push(returnUrl) : setSignInFailed(true)
        })
    }

    return (
        <main id={styles.container}>
            <Head>
                <title>Se connecter</title>
                <meta 
                    name="description" 
                    content="Sign into the ChatRoom App" 
                />
            </Head>
            <section id={styles.loginForm}>
                <section id={styles.greeting}>
                    <h2>Welcome back</h2>
                    <p>Sign in to start chatting :)</p>
                </section>
                <form 
                    name="login" 
                    onSubmit={(handleSubmit as FormEventHandler)}>
                    <FieldContainer fullWidth>
                        <Label htmlFor="username">Email</Label>
                        <TextInput 
                            placeholder="johndoe@website.com"
                            onChange={setUserName}
                            name={"username"}
                            currentValue={username}
                            bigPadding
                            fullWidth
                        />
                    </FieldContainer>
                    <FieldContainer fullWidth>
                        <Label htmlFor="password">Password</Label>
                        <TextInput 
                            placeholder="*****"
                            onChange={setPassword}
                            name={"password"}
                            currentValue={password}
                            bigPadding
                            password
                            fullWidth
                        />
                    </FieldContainer>
                    <Button 
                        icon={faRightToBracket}
                        type="submit"
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Se connecter
                    </Button>
                </form>
                <p className={styles.error + (signInFailed ? ' ' + styles.showError : '')}>Invalid credentials</p>
            </section>
            <section id={styles.hero}>
                <div className={styles.appName}>
                    <FontAwesomeIcon icon={faMessage}/>
                    <h1>ChatRoom</h1>
                </div>
                <section id={styles.illustrationContainer}>
                    <Image 
                        quality={100}
                        src={'/images/project-team.svg'} 
                        alt={"Illustration d'une équipe projet en action."} 
                        priority
                        fill
                        style={{ 
                            objectFit: "contain", 
                            top: "auto"
                        }}
                    />
                </section>
            </section>
            
        </main>
    )
}

export default Login