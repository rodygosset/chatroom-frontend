import { threadsURL } from "@conf/conf"
import { getThreadAuthors, ThreadPreview } from "@conf/data-types"
import { MySession } from "@conf/utility-types"
import { faComments, faXmark } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"
import Button from "./button"
import Select from "./form-elements/select"
import NewThreadForm from "./new-thread-form"
import ThreadCard from "./thread-card"
import styles from '@styles/components/thread-list.module.scss'


interface Props {
    className?: string;
    currentThreadID?: string;
    setCurrentThreadID: (newID?: string) => void;
    initThreads: ThreadPreview[];
    hide: () => void;
}

const ThreadList = (
    {
        className,
        currentThreadID,
        setCurrentThreadID,
        initThreads,
        hide
    }: Props
) => {

    // get current user

    const session = useSession()
    
	const sessionData = session.data as MySession | null
    const user = sessionData?.user

    // state

	const [threads, setThreads] = useState<ThreadPreview[]>(initThreads)


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

    // utils

    const getClassNames = () => {
        let classNames = styles.threadList
        classNames += className ? ' ' + className : ''
        return classNames
    }

    // render

    return (
        <section className={getClassNames()}>
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
                            onClick={() => {
                                if(currentThreadID != thread._id) {
                                    setCurrentThreadID(thread._id)
                                    hide()
                                } else setCurrentThreadID(undefined)
                                
                            }}
                            onDelete={handleThreadDelete}
                        />
                    )
                })
                :
                <></>
            }
            </ul>
        </section>
    )

}

export default ThreadList