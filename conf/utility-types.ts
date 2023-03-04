import { Session } from "next-auth";
import { User } from "./data-types";

// @ts-ignore
export interface MySession extends Session {
    access_token: string;
    user: User;
}