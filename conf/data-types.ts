

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

export interface Message {
    _id: string;
    author_id: string;
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
    _id: string;
    title: string;
    content: string;
}