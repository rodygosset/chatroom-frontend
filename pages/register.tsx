import FieldContainer from "@components/form-elements/field-container"
import Label from "@components/form-elements/label"
import TextInput from "@components/form-elements/text-input"
import { faArrowUpRightFromSquare, faMessage, faRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@styles/pages/login.module.scss"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, FormEventHandler, useEffect, useState } from "react"

import { signOut } from "next-auth/react"
import Button from "@components/button"
import Link from "next/link"
import axios from "axios"
import { User, UserCreate } from "@conf/data-types"
import { registerURL } from "@conf/conf"


const Register: NextPage = () => {

    const router = useRouter()

    let returnUrl = router.query.returnUrl?.toString() || '/';

    // navigating to this page automatically signs the user out
    // useEffect(() => {
    //     signOut()
    // }, [])

    // state

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    const [signUpFailed, setSignUpFailed] = useState(false)

    const handleSubmit = async (event: FormEvent | MouseEvent) =>{
        event.preventDefault()
        const formData = new FormData();
        formData.append('email', email)
        formData.append('password', password)
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        axios.post<UserCreate>(registerURL, formData)
        .then((response) => {
            if(!response) return
            response.status == 200 ? router.push(returnUrl) : setSignUpFailed(true)
        })
    }

    return (
        <main id={styles.container}>
            <Head>
                <title>Sign Up</title>
                <meta 
                    name="description" 
                    content="Sign up for the ChatRoom App" 
                />
            </Head>
            <section id={styles.loginForm}>
                <section id={styles.greeting}>
                    <h2>Hello!</h2>
                    <p>Sign up to start chatting :)</p>
                </section>
                <form 
                    name="login" 
                    onSubmit={(handleSubmit as FormEventHandler)}>
                    <FieldContainer>
                        <Label htmlFor="username">Email</Label>
                        <TextInput 
                            placeholder="johndoe@website.com"
                            onChange={setEmail}
                            name={"email"}
                            currentValue={email}
                            required
                        />
                    </FieldContainer>
                    <div className={styles.fieldGroup}>
                        <FieldContainer>
                            <Label htmlFor="firstName">First Name</Label>
                            <TextInput 
                                placeholder="John"
                                onChange={setFirstName}
                                name={"firstName"}
                                currentValue={firstName}
                                required
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <Label htmlFor="lastName">Last Name</Label>
                            <TextInput 
                                placeholder="Doe"
                                onChange={setLastName}
                                name={"lastName"}
                                currentValue={lastName}
                                required
                            />
                        </FieldContainer>
                    </div>
                    <FieldContainer>
                        <Label htmlFor="password">Password</Label>
                        <TextInput 
                            placeholder="*****"
                            onChange={setPassword}
                            name={"password"}
                            currentValue={password}
                            password
                            required
                        />
                    </FieldContainer>
                    <Button 
                        icon={faRightToBracket}
                        type="submit"
                        onClick={handleSubmit}
                        fullWidth
                        bigPadding
                    >
                        Create account
                    </Button>
                    <p>Already have an account ? <Link href="/login">Sign in <FontAwesomeIcon icon={faArrowUpRightFromSquare}/></Link></p>
                </form>
                <p className={styles.error + (signUpFailed ? ' ' + styles.showError : '')}>An error occured</p>
            </section>
            <section id={styles.hero}>
                <div className={styles.appName}>
                    <FontAwesomeIcon icon={faMessage}/>
                    <h1>ChatRoom</h1>
                </div>
                <p>Don&apos;t wait to start chatting</p>
            </section>
            
        </main>
    )
}

export default Register