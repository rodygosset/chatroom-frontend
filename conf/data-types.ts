

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


export const getMessageReplies = (messageID: string, replies: Message[]) => {
    let messageReplies: Message[] = []
    for(const message of replies) {
        if(message.parent_id == messageID) {
            messageReplies = [...messageReplies, message, ...getMessageReplies(message._id, replies)]
        }
    }
    return messageReplies
}

export const getDirectReplies = (messageID: string, replies: Message[]) => replies.filter(reply => reply.parent_id == messageID)


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

export const getTotalUsersInThread = (thread: Thread) => {
    const users: string[] = []
    for(const message of thread.messages) {
        if(!users.includes(message.author_full_name)) {
            users.push(message.author_full_name)
        }
    }
    return users.length
}

export const getThreadAuthors = (threads: ThreadPreview[]) => {
    return threads.map(thread => thread.author_full_name).reduce<string[]>(
        (unique, author) => unique.includes(author) ? unique : [...unique, author],
        []
    )
}