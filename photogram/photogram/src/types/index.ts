import { OutputFileEntry } from "@uploadcare/react-uploader"
import { User } from "firebase/auth"

export interface UserLogin {
    email: string,
    password: string
}

export interface UserSignup {
    email: string,
    password: string, 
    confirmPassword: string, 
}

export interface FileEntry {
    files: OutputFileEntry[]
}

export interface Post {
    caption: string, 
    photos: PhotoMeta[],
    likes: number, 
    userLikes: [],
    userId: string | null,
    date: Date
}

export interface PhotoMeta {
    cdnUrl: string | null, 
    uuid: string
}


export interface DocumentResponse {
    id?: string, 
    caption?: string, 
    photos?: PhotoMeta[],
    likes?: number, 
    userLikes?: [],
    userId?: string | null,
    date?: Date
}


export interface ProfileInfo {
    user?: User, 
    displayName?: string, 
    photoURL?: string
}

export interface UserProfile {
    userId?: string,
    displayName?: string, 
    photoURL?: string, 
    userBio?: string
}
export interface ProfileResponse {
    id?: string,
    userId?: string,
    displayName?: string, 
    photoURL?: string, 
    userBio?: string
   
}