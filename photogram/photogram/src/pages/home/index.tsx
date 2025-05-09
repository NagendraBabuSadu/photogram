import Layout from '@/components/layout';
import PostCard from '@/components/PostCard';
import Stories from '@/components/stories';
import { Input } from '@/components/ui/input';
import { useUserAuth } from '@/context/userAuthContext';
import { getPosts } from '@/repository/post.service';
import { DocumentResponse } from '@/types';
import { Search } from 'lucide-react';
import * as React from 'react';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

  const {user} = useUserAuth();
  const [data, setData] = React.useState<DocumentResponse[]>([]);
  const getAllPosts = async () => {
    const response : DocumentResponse [] = (await getPosts()) || [];
    console.log("All posts are: ", response)
    setData(response);
  } 

  React.useEffect(() => {
    if(user != null) {
      getAllPosts();
    } 
  }, [])

  const renderPost = () => {
    return data.map((item) => {
      return (
        <PostCard data={item} key={item.id}/>
      )
    })
  }

  return (
    <Layout >
      <div className='flex flex-col  w-full h-screen text-black'>
        <div className="relative mn-6 text-gray-600" >
          <Input
            className="border-2 bg-white h-10 px-6 pr-16 rounded-sm text-base focus:outline-none"
            placeholder="Search"
            type='search'
            name='search'
          />
          <button className='absolute -right-0 -top-0' type='submit'>
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="flex flex-col mt-4 mb-5 ">
          <h3 className='flex mb-3'>Stories</h3>
          <Stories />
           
        </div>
        <div className="flex flex-col mt-4 mb-5 ">
        <h3 className='flex mb-3'>Feed</h3>
          <div className="w-full flex justify-center">
            <div className="flex flex-col max-w-sm rounded-sm overflow-hidden">
              {data ? renderPost() : <div>...Loading</div> }
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
};

export default Home;
