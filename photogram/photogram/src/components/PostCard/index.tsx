import { useUserAuth } from '@/context/userAuthContext';
import { DocumentResponse } from '@/types';
import * as React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import image2 from '@/assets/images/image2.jpg'

import { HeartIcon, MessageCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { updateLikesOnPost } from '@/repository/post.service';


interface IPostCardProps {
    data: DocumentResponse;

}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {

    const { user } = useUserAuth();

    const [likesInfo, setLikesInfo] = React.useState<{
        likes: number,
        isLike: boolean
    }>({
        likes: data.likes,
        isLike: data.userLikes.includes(user.uid) ? true : false
    })

    const updateLike = async (isVal: boolean) => {
        setLikesInfo({
            likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
            isLike: !likesInfo.isLike
        });
        if (isVal) {
            data?.userLikes.push(user!.uid);
        } else {
            data.userLikes?.splice(data.userLikes.indexOf(user?.uid), 1)
        }

        await updateLikesOnPost(data.id!, data.userLikes!, isVal ? likesInfo.likes + 1 : likesInfo.likes - 1);
        
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex flex-col'>
                    <span className='mr-2'>
                        <img src={image2} alt="" className='w-10 h-10 rounded-full border-2 ' />
                    </span>
                    <span className='mr-2'>Guest User</span>
                </CardTitle>

            </CardHeader>
            <CardContent className='p-3'>
                <img src={data.photos ? data.photos[0].cdnUrl : ""} alt="" className='w-80 h-40 object-cover' />
            </CardContent>
            <CardFooter className='flex flex-col p-3'>
                <div className='flex justify-between w-full mb-3'>
                    <HeartIcon className={cn(
                        "mr-3",
                        "cursor-pointer",
                        likesInfo.isLike ? "fill-red-500" : "fill-none"
                    )}
                        onClick={() => updateLike(!likesInfo.isLike)} />
                    <MessageCircleIcon className='right-3' />
                </div>
                <div className="w-full text-sm">{likesInfo.likes} likes</div>
                <div className="w-full text-sm">{data.caption}</div>
            </CardFooter>
        </Card>

    )
};

export default PostCard;
