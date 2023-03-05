

export interface User {
    _id: string;
    email: string;
    first_name: string;
    last_name: string
}

export interface UserCreate {
    email: string;
    first_name: string;
    last_name: string
    password: string;
}

export const getUserFullName = (user: User) => user.first_name + ' ' + user.last_name

export interface Message {
    _id: string;
    date: string;
    author_full_name: string;
    content: string;
    parent_id?: string;
}

export interface MessageCreate {
    content: string;
    parent_id?: string;
}


export interface Thread {
    _id: string;
    title: string;
    first_message_id: string;
    messages: Message[];
}

export interface ThreadCreate {
    title: string;
    content: string;
}

export interface ThreadPreview {
    _id: string;
    title: string;
    author_full_name: string;
    date: string;
    first_message_content: string;
}