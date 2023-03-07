import Button from "@components/button";
import { threadsURL } from "@conf/conf";
import { ThreadPreview } from "@conf/data-types";
import { MySession } from "@conf/utility-types";
import styles from "@styles/components/modals/thread-deletion-dialog.module.scss"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ModalContainer from "./modal-container";

interface Props {
    thread: ThreadPreview;
    isVisible: boolean;
    closeDialog: () => void;
    onDelete: () => void;
}

const ThreadDeletionDialog = (
    {
        thread,
        isVisible,
        closeDialog,
        onDelete
    }: Props
) => {

    // state

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)

    // on cancel

    const handleNoClick = () => closeDialog()

    // when the user clicks on yes
    // open the confirmation dialog

    const handleYesClick = () => setShowConfirmationDialog(true)


    // if the user cancels when asked to confirm

    const handleCancellation = () => {
        setShowConfirmationDialog(false)
        closeDialog()
    }

    // if the user confirms they intend to delete the item


    const session = useSession()
    
	const sessionData = session.data as MySession | null

    const handleDelete = () => {
        axios.get(`${threadsURL}&action=delete&id=${thread._id}`, {
			headers: { Authorization: `Bearer ${sessionData?.access_token}` }
		}).then(onDelete)
    }


    // render

    return (
        <>
            <ModalContainer isVisible={isVisible && !showConfirmationDialog}>
                <section className={styles.modal}>
                    <h4>Delete a thread</h4>
                    <p>Are you sure you want to delete <span>{thread.title}</span> ?</p>
                    <div className={styles.buttonsContainer}>
                        <Button
                            onClick={handleNoClick}
                            role="secondary"
                            animateOnHover={false}
                            fullWidth>
                            Cancel
                        </Button>
                        <Button
                            className={styles.yesButton}
                            onClick={handleYesClick}
                            role="primary"
                            fullWidth>
                            Delete
                        </Button>
                    </div>
                </section>
            </ModalContainer>
            <ModalContainer isVisible={showConfirmationDialog}>
                <section className={styles.modal}>
                    <h4>Confirm</h4>
                    <p>Do you confirm you want to delete <span>{thread.title}</span></p>
                    <div className={styles.buttonsContainer}>
                        <Button
                            onClick={handleCancellation}
                            role="secondary"
                            animateOnHover={false}
                            fullWidth>
                            Cancel
                        </Button>
                        <Button
                            className={styles.yesButton}
                            onClick={handleDelete}
                            role="primary"
                            fullWidth>
                            Delete
                        </Button>
                    </div>
                </section>
            </ModalContainer>
        </>
    )

}

export default ThreadDeletionDialog