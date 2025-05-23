
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig"
import { ProfileInfo } from "@/types";


// ==============================
// AUTH CONTEXT DEFINITIONS
// ==============================

type AuthData = {
    user: User | null,
    login: typeof login,
    signup: typeof signup,
    logout: typeof logout,
    googleSignIn: typeof googleSignIn, 
    userProfileUpdatedInfo: typeof userProfileUpdatedInfo
}

const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}
const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}
const logout = () => {
    signOut(auth);
}

const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
}

const userProfileUpdatedInfo = (userProfile: ProfileInfo) => {
    console.log("Profile Info: ", userProfile);
    return updateProfile(userProfile.user!, {
        displayName: userProfile.displayName, 
        photoURL: userProfile.photoURL
    })
} 

// ==============================
// AUTH PROVIDER COMPONENT
// ==============================


interface IUSerAuthProviderProps {
    children: React.ReactNode
}

export const UserAuthProvider: React.FunctionComponent<IUSerAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("User signed in: ", user);

            if (user) {
                setUser(user)
            }

        })
        return () => {
            unsubscribe();
        }
    })

    const value: AuthData = {
        user,
        login,
        signup,
        logout,
        googleSignIn,
        userProfileUpdatedInfo
    }
    return (
        <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>
    )
}

// useContext hook 
const UserAuthContext = createContext<AuthData>({
    user: null,
    login,
    signup,
    logout,
    googleSignIn,
    userProfileUpdatedInfo
});


export const useUserAuth = () => {
    return useContext(UserAuthContext)
}
