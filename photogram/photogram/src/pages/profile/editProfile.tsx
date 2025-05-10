import * as React from "react";
import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileEntry, ProfileInfo, UserProfile } from "@/types";
import { Label } from "@radix-ui/react-label";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from "@/assets/images/avatar.jpg";
import { Input } from "@/components/ui/input";
import {
  createUserProfile,
  updateUserProfile,
} from "@/repository/user.service";
import { useUserAuth } from "@/context/userAuthContext";
import { updatedPostsWithUserInfo } from "@/repository/post.service";

interface IEditProfileProps {}

const EditProfile: React.FunctionComponent<IEditProfileProps> = (props) => {
  const {user, userProfileUpdatedInfo} = useUserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { id, userId, userBio, displayName, photoURL } = location.state;


  const [data, setData] = React.useState<UserProfile>({
    userId,
    userBio,
    displayName,
    photoURL,
  });

  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: [],
  });

  const updateProfile = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await updateUserProfile(id, data);
        console.log("Update response", response);
      } else {
        const response = await createUserProfile(data);
        console.log("Response: ", response);
      }
      const userProfile: ProfileInfo = {
        user: user!,
        displayName: data.displayName,
        photoURL: data.photoURL
      }
      
      userProfileUpdatedInfo(userProfile)

      updatedPostsWithUserInfo(userProfile);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    updateProfile;
    console.log("fileent", fileEntry);
    if (fileEntry.files.length > 0) {
      setData({ ...data, photoURL: fileEntry.files[0].cdnUrl || "" });
    }
  }, [fileEntry]);

  return (
    <Layout>
      <div className="flex justify-center flex-col  bg-slate-800">
        <div className="text-white  text-sm p-1">
          <h3 className="text-center text-2xl">Edit Profile</h3>
          <div className="flex flex-col pl-6 pb-2">
            <Label className="mb-4" htmlFor="photo">
              s Profile Picture
            </Label>
            <div className="mb-4">
              {fileEntry.files.length > 0 ? (
                <img
                  src={fileEntry.files[0].cdnUrl!}
                  alt="avatar"
                  className="w-28 h-28 rounded-full border-2 border-slate-800"
                />
              ) : (
                <img
                  src={data.photoURL ? data.photoURL : avatar}
                  alt="avatar"
                  className="w-28 h-28 rounded-full border-2 border-slate-800"
                />
              )}
            </div>
            <FileUploader
              fileEntry={fileEntry}
              onChange={(data) => {
                setFileEntry({ ...fileEntry, files: data });
              }}
              preview={false}
            />
          </div>
        </div>
        <div className="p-8">
          <form onSubmit={updateProfile}>
            <div className="flex ">
              <div className="flex flex-col ">
                <Label className="mb-1" htmlFor="displayName">
                  Display Name:
                </Label>
                <Input
                  id="displayName"
                  placeholder="Change the Name"
                  className="mb-5"
                  value={data?.displayName}
                  onChange={(e) =>
                    setData({ ...data, displayName: e.target.value })
                  }
                />
                <Label className="mb-1" htmlFor="userBio">
                  User Bio:
                </Label>
                <Textarea
                  id="diuserBio"
                  placeholder="Edit the Bio"
                  className="mb-5"
                  value={data?.userBio}
                  onChange={(e) =>
                    setData({ ...data, userBio: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex gap-4 justify-center ">
              <Button className="mt-8 w-32 text-white " type="submit">
                Update
              </Button>
              <Button
                className="mt-8 w-32"
                style={{
                  backgroundColor: "red",
                }}
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
