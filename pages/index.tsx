import Header from '@components/header'
import { MySession } from '@conf/utility-types'
import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import styles from '@styles/pages/home.module.scss'
import { useState } from 'react'
import Button from '@components/button'
import { faComments, faXmark } from '@fortawesome/free-solid-svg-icons'
import ThreadViewer from '@components/thread-viewer'
import { getThreadAuthors, ThreadPreview } from '@conf/data-types'
import ThreadCard from '@components/thread-card'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import axios from 'axios'
import { threadsURL } from '@conf/conf'
import NewThreadForm from '@components/new-thread-form'
import Select from '@components/form-elements/select'
import ThreadList from '@components/thread-list'


interface Props {
	data: ThreadPreview[];
}

const Home: NextPage<Props> = (
	{
		data
	}
) => {

	// get current user

    const session = useSession()
    
	const sessionData = session.data as MySession | null
    const user = sessionData?.user

	// state

	const [currentThreadID, setCurrentThreadID] = useState<string | undefined>()
	// render

	return (
	<>
		<Head>
			<title>ChatRoom</title>
			<meta name="description" content="ChatRoom App" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
		<Header
			currentThreadID={currentThreadID}
			setCurrentThreadID={setCurrentThreadID}
			initThreads={data}
		/>
		<main id={styles.main}>
			<ThreadList
				className={styles.threadList}
				hide={() => {}}
				currentThreadID={currentThreadID}
				setCurrentThreadID={setCurrentThreadID}
				initThreads={data}
			/>
			<ThreadViewer threadID={currentThreadID}/>
		</main>
	</>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

	// retrieve the session, containing the user's auth token

    const session = (await getServerSession(context.req, context.res, authOptions)) as MySession

	// get the list of threads

	const threads = await axios.get<ThreadPreview[]>(`${threadsURL}&action=getAll`, {
		headers: { Authorization: `Bearer ${session?.access_token}` }
	})
	.then(res => res.data)

	// pass it as props

	return {
		props: {
			data: threads
		}
	}
}


export default Home