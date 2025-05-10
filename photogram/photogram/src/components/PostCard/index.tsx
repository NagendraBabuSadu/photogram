import { useUserAuth } from "@/context/userAuthContext";
import { DocumentResponse } from "@/types";
import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HeartIcon, MessageCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateLikesOnPost } from "@/repository/post.service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface IPostCardProps {
  data: DocumentResponse;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
  const { user } = useUserAuth();

  const [likesInfo, setLikesInfo] = React.useState<{
    likes: number;
    isLike: boolean;
  }>({
    likes: data.likes,
    isLike: data.userLikes.includes(user.uid) ? true : false,
  });

  const updateLike = async (isVal: boolean) => {
    setLikesInfo({
      likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
      isLike: !likesInfo.isLike,
    });
    if (isVal) {
      data?.userLikes.push(user?.uid);
    } else {
      data.userLikes?.splice(data.userLikes.indexOf(user?.uid), 1);
    }

    await updateLikesOnPost(
      data.id!,
      data.userLikes!,
      isVal ? likesInfo.likes + 1 : likesInfo.likes - 1
    );
  };
  console.log("data is: ", data);

  return (
    <div className="flex ">
      <Card className="flex mb-3 bg-slate-800 text-white">
        <CardHeader>
          <CardTitle className="flex flex-col ">
            <span className="mr-2">
              <img
                src={data.photoURL}
                alt=""
                className="w-10 h-10 rounded-full border-2  "
              />
            </span>
            <span className="mr-2 mt-2">{data.username}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <Dialog>
            <DialogTrigger asChild>
              <img
                src={data.photos ? data.photos[0].cdnUrl : ""}
                alt=""
                className="w-80 h-full object-cover"
              />
            </DialogTrigger>

            <DialogContent className="sm:max-w-[800px] bg-slate-700 transition-all duration-500 ease-in scale-95 opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100">
              <DialogHeader>
                <DialogTitle>{data.caption}</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 transition-all duration-100 ease-in-out" >
                <img
                  src={data.photos ? data.photos[0].cdnUrl : ""}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardFooter className="flex flex-col p-3">
          <div className="flex justify-between w-full mb-3">
            <HeartIcon
              className={cn(
                "mr-3",
                "cursor-pointer",
                likesInfo.isLike ? "fill-red-500" : "fill-none"
              )}
              onClick={() => updateLike(!likesInfo.isLike)}
            />
            <MessageCircleIcon className="right-3" />
          </div>
          <div className="w-full text-sm">{likesInfo.likes} likes</div>
          <div className="w-full text-sm">
            {data.username}: {data.caption}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
