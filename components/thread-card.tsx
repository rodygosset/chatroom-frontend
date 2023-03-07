import styles from "@styles/components/thread-card.module.scss"
import { getUserFullName, ThreadPreview } from "@conf/data-types"
import { getUIDate } from "@utils/general";
import axios from "axios";
import { threadsURL } from "@conf/conf";
import { MySession } from "@conf/utility-types";
import { useSession } from "next-auth/react";
import Button from "./button";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ThreadDeletionDialog from "./modals/thread-deletion-dialog";


interface Props {
    data: ThreadPreview;
    isSelected: boolean;
    onClick: () => void;
    onDelete: () => void;
}

const ThreadCard = (
    {
        data,
        isSelected,
        onClick,
        onDelete
    }: Props
) => {

    // get current user

    const session = useSession()
    
	const sessionData = session.data as MySession | null
    const user = sessionData?.user

    // utils

    const getClassNames = () => {
        let classNames = styles.card
        classNames += isSelected ? ' ' + styles.selected : ''
        return classNames
    }

    // handlers

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const handleDelete = () => setShowDeleteDialog(true)

    // render

    return (
        <>
            <li className={getClassNames()} onClick={onClick}>
                <h4>{data.title}</h4>
                <p className={styles.metaData}>By { data.author_full_name } &#x2022; {getUIDate(data.date)}</p>
                <p className={styles.message}>{data.first_message_content}</p>
                {
                    user && (getUserFullName(user) == data.author_full_name) ?
                    <Button
                        className={styles.deleteButton}
                        icon={faTrashAlt}
                        role="tertiary"
                        onClick={handleDelete}>
                        Delete
                    </Button>
                    :
                    <></>
                }
            </li>
            <ThreadDeletionDialog
                thread={data}
                isVisible={showDeleteDialog}
                closeDialog={() => setShowDeleteDialog(false)}
                onDelete={onDelete}
            />
        </>
    )
}


export default ThreadCard