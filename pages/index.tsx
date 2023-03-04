import { MySession } from '@conf/utility-types'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

export default function Home() {

	// get current user

    const session = useSession()
    
    const user = (session.data as MySession | null)?.user

	return (
	<>
		<Head>
			<title>ChatRoom</title>
			<meta name="description" content="ChatRoom App" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
		<main>
			<h1>Welcome back, {user?.email}</h1>
		</main>
	</>
	)
}
