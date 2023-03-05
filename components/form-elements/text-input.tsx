
import styles from "@styles/components/form-elements/text-input.module.scss"
import { ChangeEvent } from "react";


interface Props {
    className?: string;
    placeholder?: string;
    onChange: (newValue: string) => void;
    name?: string;
    defaultValue?: string;
    currentValue?: string;
    password?: boolean;
    required?: boolean;
    isInErrorState?: boolean;
}

const TextInput = ({ 
        className,
        placeholder, 
        onChange, 
        name,
        defaultValue, 
        currentValue, 
        password,
        required,
        isInErrorState
    }: Props) => {

    const getClassNames = () => {
        let classNames = styles.textInput 
        classNames += (className ? ' ' + className : '')
        classNames += (isInErrorState ? ' ' + styles.error : '')
        return classNames
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault()
        onChange(event.target.value)
    }

    return (
        <input 
            className={getClassNames()}
            name={name ? name : undefined}
            type={password ? "password" : "text"}
            placeholder={placeholder ? placeholder : undefined}
            onChange={handleChange}
            defaultValue={defaultValue ? defaultValue : undefined}
            value={currentValue}
            required={required}
        />
        
    )
}

export default TextInput