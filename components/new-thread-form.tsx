import { threadsURL } from "@conf/conf"
import { MySession } from "@conf/utility-types"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useSession } from "next-auth/react"
import { FormEventHandler, useState } from "react"
import Button from "./button"
import FieldContainer from "./form-elements/field-container"
import Label from "./form-elements/label"
import TextInput from "./form-elements/text-input"


interface Props {
    onSubmit: () => void;
}

const NewThreadForm = (
    {
        onSubmit
    }: Props
) => {

    // state

    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")

    // authentication

    const session = useSession()
    
    const sessionData = (session.data as MySession | null)

    // handlers

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append("title", title)
        formData.append("content", message)
        axios.post(`${threadsURL}&action=create`, formData, {
            headers: { Authorization: `Bearer ${sessionData?.access_token}` }
        }).then(() => onSubmit())
    }
 

    // render

    return (
        <form 
            onSubmit={(handleSubmit as FormEventHandler)}>
            <FieldContainer>
                <Label htmlFor="title">Title</Label>
                <TextInput 
                    placeholder="Thread title"
                    onChange={setTitle}
                    name={"title"}
                    currentValue={title}
                    required
                />
            </FieldContainer>
            <FieldContainer>
                <Label htmlFor="message">Message</Label>
                <TextInput 
                    placeholder="Type..."
                    onChange={setMessage}
                    name={"message"}
                    currentValue={message}
                    isTextArea
                    required
                />
            </FieldContainer>
            <Button 
                icon={faArrowRight}
                type="submit"
                onClick={handleSubmit}
                fullWidth
                bigPadding
            >
                Create
            </Button>
        </form>
    )

}



export default NewThreadForm