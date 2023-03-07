import Header from '@components/header'
import { MySession } from '@conf/utility-types'
import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import styles from '@styles/pages/home.module.scss'
import { useEffect, useState } from 'react'
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

	const [threads, setThreads] = useState<ThreadPreview[]>(data)

	const [currentThreadID, setCurrentThreadID] = useState<string | undefined>()

	useEffect(() => console.log(threads), [threads])

	const refreshThreads = () => {
		axios.get<ThreadPreview[]>(`${threadsURL}&action=getAll`, {
			headers: { Authorization: `Bearer ${sessionData?.access_token}` }
		}).then(res => setThreads(res.data))
	}

	// manage thread creation form visibility

	const [showForm, setShowForm] = useState(false)

	// handlers

	const handleNewThreadClick = () => setShowForm(!showForm)

	const handleThreadDelete = () => {
		setCurrentThreadID(undefined)
		refreshThreads()
	}

	// select which threads to show based on selected user

	const [selectedUser, setSelectedUser] = useState("all")

	const getUserSelectOptions = () => ["all", ...getThreadAuthors(threads)]

	const getThreadsBySelectedUser = () => threads.filter(thread => selectedUser == "all" ? true : thread.author_full_name == selectedUser)

	// render

	return (
	<>
		<Head>
			<title>ChatRoom</title>
			<meta name="description" content="ChatRoom App" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
		<Header/>
		<main id={styles.main}>
			<section className={styles.threadList}>
				<div className={styles.greeting}>
					<h2>Welcome {user?.first_name}</h2>
					<p>Checkout the latest threads, or start a new one !</p>
				</div>
				<div className={styles.sectionTitle}>
					<h3>Threads</h3>
					<Button
						icon={showForm ? faXmark : faComments}
						onClick={handleNewThreadClick}>
						{ showForm ? "Cancel" : "New Thread" }
					</Button>
				</div>
				<Select
					label="Threads started by user"
					name="user"
					options={getUserSelectOptions()}
					onChange={value => setSelectedUser(value)}
				/>
				{
					showForm ?
					<NewThreadForm
						onSubmit={() => {
							refreshThreads()
							setShowForm(false)
						}}
					/>
					:
					<></>
				}
				<ul>
				{
					// @ts-ignore
					threads && threads.map && !showForm ?
					getThreadsBySelectedUser().map(thread => {
						return (
							<ThreadCard 
								key={thread.title}
								data={thread}
								isSelected={currentThreadID == thread._id}
								onClick={() => setCurrentThreadID(thread._id)}
								onDelete={handleThreadDelete}
							/>
						)
					})
					:
					<></>
				}
				</ul>
			</section>
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