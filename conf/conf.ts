

// URLs

export const apiURL = "http://localhost:8080/php/ChatRoom/index.php"

// auth

export const registerURL = `${apiURL}?ctrl=user&action=register`
export const loginURL = `${apiURL}?ctrl=user&action=authenticate`
export const currentUserURL = `${apiURL}?ctrl=user&action=me`
export const authCheckURL = `${apiURL}?ctrl=user&action=hello`

// models URL

export const threadsURL = `${apiURL}?ctrl=thread`
export const messageURL = `${apiURL}?ctrl=message`
