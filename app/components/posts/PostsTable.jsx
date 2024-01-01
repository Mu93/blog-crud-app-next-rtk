"use client";
import Link from "next/link";
// import { sort } from "fast-sort";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deletePost,
  fetchPosts,
} from "@/app/store/slices/posts/postsAsyncThunks";
import { Button } from "@/app/components";
import { data, loadMore } from "@/app/store/slices/posts/postsSlice";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(data);

  // fetchPosts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // pagination
  const {
    posts,
    pagination: { totalItems, itemsPerPage },
  } = useSelector(data);

  return (
    <>
      <table className="min-w-full table table-bordered">
        <colgroup>
          <col className="border-r border-gray-300" />
          <col className="border-r border-gray-300" />
          <col className="border-r border-gray-300" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">ID</th>
            <th className="py-2 px-4 border-b border-gray-300">
              {/* query string parameters pass state on the server  */}
              <Link href="/?sortOrder=title">Title</Link>
            </th>
            <th className="py-2 px-4 border-b border-gray-300">
              <Link href="/?sortOrder=body">Body</Link>
            </th>
            <th className="py-2 px-4 border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts?.slice(0, itemsPerPage).map((post) => (
            <tr key={post.id}>
              <td className="py-2 px-4 border-b border-gray-300">{post.id}</td>
              <td className="py-2 px-4 border-b border-gray-300 text-blue-500">
                <Link href={`post/${post.id}`}>{post.title}</Link>
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {post.body.slice(0, 100) + "..."}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 flex space-x-3">
                <Link
                  href={`/post/${post.id}/edit`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
                <Button
                  className="btn btn-error text-white bg-red-500"
                  onClick={() => dispatch(deletePost(post.id))}
                  disabled={status === "loading"}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 flex items-center justify-center ">
        <Button
          className="btn btn-primary disabled:bg-blue-100"
          onClick={() => dispatch(loadMore())}
          disabled={itemsPerPage >= totalItems}
        >
          Load More
        </Button>
      </div>
    </>
  );
};

export default PostsTable;
