import Button from "@components/button"
import { messageURL } from "@conf/conf";
import { MessageCreate } from "@conf/data-types";
import { MySession } from "@conf/utility-types";
import styles from "@styles/components/form-elements/message-input.module.scss"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react"

interface Props {
    messageReplyID: string | null;
    refresh: () => void;
}

const MessageInput = (
    {
        messageReplyID,
        refresh
    }: Props
) => {

    // state

    const [message, setMessage] = useState("")

    const session = useSession()
    
    const sessionData = (session.data as MySession | null)

    // handlers

    const handleSend = () => {
        if(!messageReplyID) return
        const formData = new FormData()
        formData.append("content", message)
        formData.append("parent_id", messageReplyID)
        axios.post<MessageCreate>(`${messageURL}&action=post`, formData, {
            headers: { Authorization: `Bearer ${sessionData?.access_token}` }
        }).then(refresh)
    }

    // render

    return (
        <div className={styles.messageInput}>
            <input 
                type="text" 
                name="message"
                placeholder="Type message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <Button
                onClick={handleSend}>
                Send
            </Button>
        </div>
        
    )

}

export default MessageInput