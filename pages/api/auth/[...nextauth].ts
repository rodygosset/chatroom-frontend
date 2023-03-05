import axios from "axios"
import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"

import FormData from 'form-data'

import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "@conf/data-types"
import { currentUserURL, loginURL } from "@conf/conf"


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // @ts-ignore
        async authorize(credentials: any) { 

            // build the form data 
            const formData = new FormData()
            formData.append('email', credentials.email)
            formData.append('password', credentials.password)

            // send the credentials to the API login endpoint
            
            const res = await axios.post(loginURL, formData)
    
            // If no error and we have the JWT, return the access token
            if (res.status == 200) {
                // get user data
                const { data: userData } = await axios.get<User>(currentUserURL, {
                    headers: {
                        Authorization: `Bearer ${res.data}` 
                    }
                })
                // return the access token along with user data
                return {
                    access_token: res.data,
                    ...userData
                }

            }
            // Return null if user data could not be retrieved
            return null
        }
        })
    ],
    
    session: {
        strategy: 'jwt'
    },

    pages: {
        signIn: "/login"
    },

    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                // @ts-ignore
                token = { access_token: user.access_token }
                // @ts-ignore
                delete user.access_token
                token.user = user
            }
            return token
        },
        async session({ session, token })  {
            // @ts-ignore
            session.access_token = token.access_token
            // @ts-ignore
            session.user = token.user
            return session
        }
    },

    debug: true
}

export default NextAuth(authOptions)
