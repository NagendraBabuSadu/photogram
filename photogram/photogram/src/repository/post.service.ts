import { DocumentResponse, Post, ProfileInfo } from "@/types";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // adjust path based on actual location

const COLLECTION_NAME = "posts";

export const createPost = async (post: Post) => {
    return await addDoc(collection(db, COLLECTION_NAME), post);
}

export const getPosts = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const tempArr: DocumentResponse[] = [];
        if (querySnapshot.size > 0) {
            querySnapshot.forEach((item) => {
                const data = item.data() as Post;
                const responseObj: DocumentResponse = {
                    id: item.id,
                    ...data
                };
                tempArr.push(responseObj);
            })
            return tempArr;
        } else {
            console.log("No such document.");
        }
    } catch (error) {
        console.log(error);
    }
}

export const getPostByUserId = async (id: string) => {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id));
    return await getDocs(q)
}

export const getPost = async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id) ;
    return await getDocs(docRef);
}
export const deletePost = async (id: string) => {
    return deleteDoc(doc(db, COLLECTION_NAME, id));
}

export const updateLikesOnPost = async (id: string, userLikes: string[], likes: number) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
        userLikes: userLikes,
        likes: likes
    })
}

export const updatedPostsWithUserInfo = async (userProfile: ProfileInfo) => {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userProfile.user?.uid));
    console.log("the updated Posts Profile Info", q)
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot: ", querySnapshot);
    if (querySnapshot.size > 0) {
        querySnapshot.forEach((document) => {
            const docRef = doc(db, COLLECTION_NAME, document.id);
            updateDoc(docRef, {
                username: userProfile.displayName,
                photoURL: userProfile.photoURL
            })

        })
    } else {
        console.log(
            "The user doesn't have any posts."
        )
    }
}