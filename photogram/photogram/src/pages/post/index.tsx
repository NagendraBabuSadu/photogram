import FileUploader from '@/components/fileUploader';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserAuth } from '@/context/userAuthContext';
import { FileEntry, Post } from '@/types';
import * as React from 'react';

interface ICreatePostProps { }

const CreatePost: React.FC<ICreatePostProps> = () => {
  const { user } = useUserAuth();

  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: []
  });


  const [post, setPost] = React.useState<Post>({
    caption: '',
    photos: [],
    likes: 0,
    userLikes: [],
    userId: null,
    date: new Date()
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('FileEntry: ', fileEntry);
    console.log('Post: ', post);
    // TODO: Implement post submission logic

    if (fileEntry.files.length === 0) {
      console.warn("No files uploaded");
      return;
    }

   

  };

  return (
    <Layout>
      <div className="flex justify-center text-black">
        <div className="border mx-auto max-w-3xl w-full">
          <div className="bg-slate-800 text-white text-center text-lg p-2">
            <h3>Create a Post</h3>
          </div>
          <div className="p-8">

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="caption">
                  Photo Caption
                </Label>
                <Textarea
                  id="caption"
                  placeholder="What's going on?"
                  className="mb-5"
                  value={post.caption}
                  onChange={(e) =>
                    setPost({ ...post, caption: e.target.value })
                  }
                />
                <div className="flex flex-col">
                  <Label className="mb-4" htmlFor="photo">
                    Photos
                  </Label>
                  <FileUploader fileEntry={fileEntry} onChange={(files) => setFileEntry({ ...fileEntry, files })} />
                </div>
                <Button className="mt-8 w-32 text-white" type="submit">
                  Post
                </Button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
