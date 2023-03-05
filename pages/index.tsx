import Button from '@components/button'
import { MySession } from '@conf/utility-types'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {

	// get current user

    const session = useSession()
    
    const user = (session.data as MySession | null)?.user

	useEffect(() => console.log(session.data), [session])

	return (
	<>
		<Head>
			<title>ChatRoom</title>
			<meta name="description" content="ChatRoom App" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
		<main>
			<h1>Welcome back, {user?.first_name}</h1>
			<Button onClick={signOut}>Sign out</Button>
		</main>
	</>
	)
}
