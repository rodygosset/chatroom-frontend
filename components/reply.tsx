import { Message } from "@conf/data-types"
import styles from "@styles/components/reply.module.scss"
import { getUIDate } from "@utils/general";
import Button from "./button";

interface Props {
    message: Message;
    onReply: () => void;
}

const Reply = (
    {
        message,
        onReply
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
                onClick={onReply}>
                Reply
            </Button>
        </li>
    )
}

export default Reply