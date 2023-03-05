import styles from "@styles/components/thread-card.module.scss"
import { ThreadPreview } from "@conf/data-types"
import { getUIDate } from "@utils/general";


interface Props {
    data: ThreadPreview;
    isSelected: boolean;
    onClick: () => void;
}

const ThreadCard = (
    {
        data,
        isSelected,
        onClick
    }: Props
) => {

    // utils

    const getClassNames = () => {
        let classNames = styles.card
        classNames += isSelected ? ' ' + styles.selected : ''
        return classNames
    }

    // render

    return (
        <li className={getClassNames()} onClick={onClick}>
            <h4>{data.title}</h4>
            <p className={styles.metaData}>By { data.author_full_name } &#x2022; {getUIDate(data.date)}</p>
            <p className={styles.message}>{data.first_message_content}</p>

        </li>
    )
}


export default ThreadCard