import { threadsURL } from "@conf/conf";
import { getDirectReplies, getMessageReplies, getTotalUsersInThread, Message, Thread } from "@conf/data-types";
import { MySession } from "@conf/utility-types";
import styles from "@styles/components/thread-viewer.module.scss"
import { getUIDate } from "@utils/general";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "./button";
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

    const [thread, setThread] = useState<Thread | undefined>()

    const [messageReplyID, setMessageReplyID] = useState<string | undefined>()

    const [refreshTrigger, setRefreshTrigger] = useState(false)

    const refresh = () => setRefreshTrigger(!refreshTrigger)

    // get thread data

    const session = useSession()
    
    const sessionData = (session.data as MySession | null)

    useEffect(() => {
        if(!threadID) {
            setThread(undefined)
            return
        }
        axios.get(`${threadsURL}&action=getOne&id=${threadID}`, {
            headers: { Authorization: `Bearer ${sessionData?.access_token}` }
        }).then(res => {
            setThread(res.data)
        })
    }, [threadID, refreshTrigger])

    useEffect(() => {
        if(!thread) {
            setMessageReplyID(undefined)
            return
        }
        console.log(thread)
        setMessageReplyID(thread.first_message_id)
    }, [thread])

    // utils

    const getClassNames = () => {
        let classNames = styles.container
        classNames += !threadID ? ' ' + styles.empty : ''
        return classNames
    }

    const getFirstMessage = () => thread ? thread.messages.find(message => message._id == thread.first_message_id) : undefined

    const getParentMessage = () => thread ? thread.messages.find(message => message._id == messageReplyID) : undefined

    const [parentMessage, setParentMessage] = useState<Message>()

    useEffect(() => setParentMessage(getParentMessage()), [messageReplyID])

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
                    <p className={styles.highlightedMetaData}>{ getTotalUsersInThread(thread) } people in this thread</p>
                    <Button
                        className={styles.replyButton}
                        role="tertiary"
                        animateOnHover={false}
                        hasPadding={false}
                        onClick={() => setMessageReplyID(thread.first_message_id)}>
                        Reply
                    </Button>
                </div>
                <ul>
                {
                    thread ?
                    getDirectReplies(thread.first_message_id, thread.messages).map((message, index) => {
                        if(message._id == thread.first_message_id) return
                        return (
                            <Reply 
                                key={message.author_full_name + "_" + index}
                                message={message}
                                onReply={() => setMessageReplyID(message._id)}
                                replies={getMessageReplies(message._id, thread.messages)}
                                setMessageReplyID={setMessageReplyID}
                            />
                        )
                    })
                    :
                    <></>
                }
                </ul>
                <MessageInput 
                    parentMessage={parentMessage}
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