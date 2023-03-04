

// URLs

export const apiURL = "localhost:8080/php/ChatRoom/index.php"

// auth

export const registerURL = `${apiURL}?ctrl=user&action=register`
export const loginURL = `${apiURL}?ctrl=user&action=authenticate`
export const authCheckURL = `${apiURL}?ctrl=user&action=hello`

// models URL

export const threadsURL = `${apiURL}?ctrl=thread`
export const messageURL = `${apiURL}?ctrl=message`