
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // adjust path based on actual location
import { UserProfile } from "@/types"
import { ProfileResponse } from "@/types";

const COLLECTION_NAME = "users";

export const createUserProfile = async (user: UserProfile) => {
    try {
        return addDoc(collection(db, COLLECTION_NAME), user);

    } catch (err) {
        console.log(err)
    }
}

export const getUserProfileById = async (userId: string) => {
    try {
        const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId))
        const querySnapshot = await getDocs(q);
        let tempData: ProfileResponse = {};
        if (querySnapshot.size > 0) {
            querySnapshot.forEach((item) => {
                const userData = item.data() as UserProfile;
                tempData = {
                    id: item.id,
                    ...userData
                }
            })
            return tempData;
        } else {
            console.log("No such document.")
            return tempData;
        }

    } catch (error) {
        console.log(error)
    }
}


export const updateUserProfile = async (id: string, user: UserProfile) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
        ...user
    })
}