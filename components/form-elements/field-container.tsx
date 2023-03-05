
import styles from "@styles/components/form-elements/field-container.module.scss"

interface Props {
    children: any;
}

const FieldContainer = ({ children }: Props) => {

    return (
        <div className={styles.fieldContainer}>
            { children }
        </div>
    )
}

export default FieldContainer


