"use client";
import { useDispatch, useSelector } from "react-redux";

import { Button, FormLayout } from "@/app/components";
import {
  deletePost,
  fetchPostById,
} from "@/app/store/slices/posts/postsAsyncThunks";
import { data } from "@/app/store/slices/posts/postsSlice";
import { useEffect } from "react";
import Loading from "@/app/loading";
import { notFound, useRouter } from "next/navigation";

const GetSinglePost = ({ id }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  const { singlePost, status } = useSelector(data);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    router.push("/");
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return notFound();
  }

  if (!singlePost) {
    return <div>No post found.</div>;
  }

  return (
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
          <th className="py-2 px-4 border-b border-gray-300">Title</th>
          <th className="py-2 px-4 border-b border-gray-300">Body</th>
          <th className="py-2 px-4 border-b border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2 px-4 border-b border-gray-300">
            {singlePost.id}
          </td>
          <td className="py-2 px-4 border-b border-gray-300">
            {singlePost.title}
          </td>
          <td className="py-2 px-4 border-b border-gray-300">
            {singlePost.body}
          </td>
          <td className="py-2 px-4 border-b border-gray-300 flex space-x-3">
            <Button
              className="btn btn-error bg-red-500 text-white"
              onClick={() => handleDelete(singlePost.id)}
              disabled={status === "loading"}
            >
              Delete
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default GetSinglePost;
