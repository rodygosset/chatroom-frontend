import { threadsURL } from "@conf/conf";
import { Thread } from "@conf/data-types";
import { MySession } from "@conf/utility-types";
import styles from "@styles/components/thread-viewer.module.scss"
import { getUIDate } from "@utils/general";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MessageInput from "./form-elements/message-input";
import Reply from "./reply";

interface Props {
    threadID?: string;
}

const ThreadViewer = (
    {
        threadID
    }: Props
) => {

    // state

    const [thread, setThread] = useState<Thread>()

    const [messageReplyID, setMessageReplyID] = useState<string | null>(null)

    const [refreshTrigger, setRefreshTrigger] = useState(false)

    const refresh = () => setRefreshTrigger(!refreshTrigger)

    // get thread data

    const session = useSession()
    
    const sessionData = (session.data as MySession | null)

    useEffect(() => {
        if(!threadID) return
        axios.get(`${threadsURL}&action=getOne&id=${threadID}`, {
            headers: { Authorization: `Bearer ${sessionData?.access_token}` }
        }).then(res => setThread(res.data))
    }, [threadID, refreshTrigger])

    useEffect(() => {
        if(!thread) return
        setMessageReplyID(thread.first_message_id)
    }, [thread])

    // utils

    const getClassNames = () => {
        let classNames = styles.container
        classNames += !threadID ? ' ' + styles.empty : ''
        return classNames
    }

    const getFirstMessage = () => thread ? thread.messages.find(message => message._id == thread.first_message_id) : undefined

    // render

    return (
        <section className={getClassNames()}>
        {
            threadID && thread ?
            <>
                <div className={styles.firstMessage}>
                    <h3>{thread.title}</h3>
                    <p className={styles.metaData}>By { getFirstMessage()?.author_full_name } &#x2022; {getUIDate(getFirstMessage()?.date)}</p>
                    <p className={styles.message}>{getFirstMessage()?.content}</p>
                </div>

                <ul>
                {
                    thread ?
                    thread.messages.map((message, index) => {
                        if(message._id == thread.first_message_id) return
                        return (
                            <Reply 
                                key={message.author_full_name + "_" + index}
                                message={message}
                                onReply={() => setMessageReplyID(message._id)}
                            />
                        )
                    })
                    :
                    <></>
                }
                </ul>
                <MessageInput 
                    messageReplyID={messageReplyID}
                    refresh={refresh}
                />
            </>
            :
            <h4>Click on a thread to start chatting!</h4>
        }
        </section>
    )

}

export default ThreadViewer