import { OutputFileEntry } from "@uploadcare/react-uploader"

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
    cdnUrl: string, 
    uuid: string
}
