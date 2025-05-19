import * as React from "react";
import "../App.css";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addPost, fetchPosts, fetchTags } from "../api/api";

interface PostListProps {}

const PostList: React.FunctionComponent<PostListProps> = (props) => {
  const [page, setPage] = React.useState(1);

  const {
    data: postData,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: ({ queryKey }) => fetchPosts(queryKey[1]),
     
});

  const queryClient = useQueryClient();

  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
  const { mutate, isSuccess } = useMutation({
    mutationFn: addPost,
    onMutate: () => {
      return { id: 1 };
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("FormData", formData);
    const title = formData.get("title");
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on"
    );

    if (!title || !tags) return;

    mutate({ id: postData.length + 1, title, tags });

    e.currentTarget.reset();

    console.log(title, tags);
  };

  return (
    <div className="container">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your post"
          className="postbox"
          name="title"
        />
        <div>
          {tagsData?.map((tag) => {
            return (
              <div key={tag} className="tagsData">
                <input type="checkbox" name={tag} id={tag} />
                <label htmlFor={tag}>{tag}</label>
              </div>
            );
          })}
        </div>
        <button type="submit">Post</button>
      </form>

      {isLoading && <>...Loading</>}
      {isError && <p>{error.message}</p>}

      <div className="pages">
        <button onClick={() => setPage((oldPage) => Math.max(oldPage - 1, 0))}>
          Previous Page
        </button>
        <span>{page}</span>
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </div>

      {postData?.map((post: any) => {
        return (
          <div key={post.id}>
            <div className="post">
              {post.title}
              {post.tags.map((tag: any) => (
                <span className="tags" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
