import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { DocumentResponse, Post, ProfileResponse } from "@/types";
import * as React from "react";
import avatar from "@/assets/images/avatar.jpg";
import { Button } from "@/components/ui/button";
import { Edit2Icon, HeartIcon } from "lucide-react";
import { getPostByUserId } from "@/repository/post.service";
import { useNavigate } from "react-router-dom";
import { getUserProfileById } from "@/repository/user.service";

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  const initialUserInfo: ProfileResponse = {
    id: "",
    userId: user?.uid,
    displayName: user?.displayName ? user.displayName : "Guest_user",
    photoURL: user?.photoURL ? user?.photoURL : "",
    userBio: "Please update your bio...",
    email: user?.email!,
  };

  const [userInfo, setUserInfo] =
    React.useState<ProfileResponse>(initialUserInfo);
  const [data, setData] = React.useState<DocumentResponse[]>([]);

  const getAllPosts = async (id: string) => {
    try {
      const getPhotos = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];

      if (getPhotos.size > 0) {
        getPhotos.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          tempArr.push(responseObj);
        });
        setData(tempArr);
      } else {
        console.log("No such doc.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderPost = () => {
    return data.map((item) => {
      return (
        <div key={item.userId} className="relative">
          <div className="absolute group transition-all duration-200 bg-transparent hover:bg-slate-900 hover:opacity-80  w-full h-full ">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div>
                <HeartIcon className="hidden group-hover:block fill-white" />
              </div>
              <div className="hidden group-hover:block text-white">
                {item.likes} likes
              </div>
            </div>
          </div>
          <img
            src={`${item?.photos[0].cdnUrl}`}
            className="object-cover h-50 w-50"
            alt=""
          />
        </div>
      );
    });
  };

  const editProfile = async () => {
    console.log("Edit profile");
    navigate("/edit-profile", { state: userInfo, replace: true });
  };

  const getUserProfileInfo = async (userId: string) => {
    const data: ProfileResponse = await getUserProfileById(userId);
    if (data.displayName) {
      setUserInfo(data);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPosts(user.uid);
      getUserProfileInfo(user.uid);
    }
  }, []);

  return (
    <Layout>
      <div className="flex justify-center  text-black">
        <div className="border max-w-3xl w-screen">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2 font-bold">
            Profile
          </h3>
          <div className="p-8 pb-4 border-b">
            <div className="flex flex-row items-center pb-2 mb-2">
              <div className="mr-2">
                <img
                  src={userInfo.photoURL ? userInfo?.photoURL : avatar}
                  alt="avatar"
                  className="w-28 h-28 rounded-full border-2 border-slate-800"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-xl ml-3 font-semibold">
                  {userInfo.displayName ? userInfo.displayName : "Guest_User"}
                </div>
                <div className="text-xl ml-3">
                  {userInfo.email ? userInfo.email : "example@email.com"}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-semibold">Bio</div>
              <div className="text-sm text-gray-500">
                {userInfo.userBio ? userInfo.userBio : "No bio available"}
              </div>
            </div>
            <div className="mb-4">
              <Button onClick={editProfile} className="mt-4 text-white ">
                <Edit2Icon className="w-4 h-4 mr-2 text-white" />
                Edit Profile
              </Button>
            </div>
            <div className="p-8 border">
              <h2 className="mb-5 text-center bg-slate-600 text-white text-xl p-1">
                My Posts
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {data ? renderPost() : <div>...Loading</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
