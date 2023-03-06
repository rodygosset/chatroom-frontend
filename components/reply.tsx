import { getDirectReplies, getMessageReplies, Message } from "@conf/data-types"
import styles from "@styles/components/reply.module.scss"
import { getUIDate } from "@utils/general";
import Button from "./button";

interface Props {
    message: Message;
    replies: Message[];
    onReply: () => void;
    setMessageReplyID: (id: string) => void;
}

const Reply = (
    {
        message,
        replies,
        onReply,
        setMessageReplyID
    }: Props
) => {

    // render

    return (
        <li className={styles.reply}>
            <p className={styles.metaData}>By { message.author_full_name } &#x2022; {getUIDate(message.date)}</p>
            <p className={styles.message}>{message.content}</p>
            <Button
                className={styles.replyButton}
                role="tertiary"
                animateOnHover={false}
                hasPadding={false}
                onClick={onReply}>
                Reply
            </Button>
            <ul>
            {
                getDirectReplies(message._id,replies).map((reply, index) => {
                    return (
                        <Reply 
                            key={reply.author_full_name + "_" + index + "pare"}
                            message={reply}
                            onReply={() => setMessageReplyID(reply._id)}
                            replies={getMessageReplies(reply._id, replies)}
                            setMessageReplyID={setMessageReplyID}
                        />
                    )
                })
            }
            </ul>
        </li>
    )
}

export default Reply