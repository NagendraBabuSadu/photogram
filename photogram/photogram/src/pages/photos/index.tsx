import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { getPostByUserId } from "@/repository/post.service";
import { DocumentResponse, Post } from "@/types";
import { HeartIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

interface IMyPhotosProps {}

const MyPhotos: React.FunctionComponent<IMyPhotosProps> = (props) => {
  const { user } = useUserAuth();
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
          console.log("The response object is: ", responseObj);
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

  React.useEffect(() => {
    if (user != null) {
      getAllPosts(user.uid);
    }
  }, []);

  const renderPost = () => {
    return data.map((item) => {
      console.log("item", item);
      return (
        <a
          key={item.userId}
          className="relative"
          target="_target"
          href={item.photos[0].cdnUrl!}
        >
          <div>
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
              src={`${item.photos[0].cdnUrl}`}
              className="object-cover h-50 w-50"
              alt=""
            />
          </div>
        </a>
      );
    });
  };
  return (
    <Layout>
      <div className="grid justify-center items-center">
        <div className="border max-w-3xl  items-center ">
          <h3 className="bg-slate-800 text-white  text-center w-full p-3 font-semibold">
            My Photos
          </h3>
        </div>
        <div className="p-6">
          <div className="flex justify-center items-center ">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data ? renderPost() : <div>...Loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPhotos;
