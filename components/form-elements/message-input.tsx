import Button from "@components/button"
import { messageURL } from "@conf/conf";
import { Message, MessageCreate } from "@conf/data-types";
import { MySession } from "@conf/utility-types";
import styles from "@styles/components/form-elements/message-input.module.scss"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react"

interface Props {
    parentMessage?: Message;
    refresh: () => void;
}

const MessageInput = (
    {
        parentMessage,
        refresh
    }: Props
) => {

    // state

    const [message, setMessage] = useState("")

    const session = useSession()
    
    const sessionData = (session.data as MySession | null)

    // handlers

    const handleSend = () => {
        if(!parentMessage) return
        const formData = new FormData()
        formData.append("content", message)
        formData.append("parent_id", parentMessage._id)
        axios.post<MessageCreate>(`${messageURL}&action=post`, formData, {
            headers: { Authorization: `Bearer ${sessionData?.access_token}` }
        }).then(() => {
            setMessage("")
            refresh()
        })
    }

    // render

    return (
        <div className={styles.wrapper}>
            {
                parentMessage ?
                <p>Replying to {parentMessage.author_full_name}: &rdquo;{parentMessage.content}&rdquo;</p>
                :
                <></>
            }
            <div className={styles.messageInput}>
                <input 
                    type="text" 
                    name="message"
                    placeholder="Type message..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <Button
                    active={parentMessage?._id ? true : false}
                    onClick={handleSend}>
                    Send
                </Button>
            </div>
        </div>
    )

}

export default MessageInput