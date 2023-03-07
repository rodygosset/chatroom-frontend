import styles from "@styles/components/form-elements/select.module.scss"
import FieldContainer from "./field-container";
import Label from "./label";


interface Props {
    label: string;
    name: string;
    options: string[];
    onChange: (selectedOption: string) => void;
}

const Select = (
    {
        label,
        name,
        options,
        onChange
    }: Props
) => {


    return (
        <div className={styles.container}>
            <p>{label}</p>
            <select 
                className={styles.select}
                name={name}
                onChange={e => onChange(e.target.value)}>
            {
                options.map((option, index) => (
                    <option
                        key={option + "_" + index}
                        value={option}>
                        {option}
                    </option>
                ))
            }
            </select>
        </div>
        
    )

}

export default Select