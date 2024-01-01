"use client";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { FormLayout, FormRow, Button } from "@/app/components";
import { addPostValidationSchema } from "@/app/constants/FormValidation";
import {
  fetchPostById,
  updatePost,
} from "@/app/store/slices/posts/postsAsyncThunks";
import { data } from "@/app/store/slices/posts/postsSlice";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { notFound } from "next/navigation";

const UpdatePost = ({ id }) => {
  const dispatch = useDispatch();
  const { singlePost, status } = useSelector(data);

  const [updatedData, setUpdatedData] = useState({ title: "", body: "" });

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singlePost) {
      setUpdatedData({ title: singlePost.title, body: singlePost.body });
    }
  }, [singlePost]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(updatePost({ id, ...values }));
    resetForm();
    setSubmitting(false);
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
    <FormLayout title="UpdatePostPage">
      <Formik
        initialValues={updatedData}
        validationSchema={addPostValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ resetForm, values }) => (
          <Form>
            <FormRow name="title" label="Title" value={updatedData.title} />

            <FormRow name="body" label="Body" value={updatedData.body} />

            <div>
              <Button
                className="bg-blue-500 text-white mr-3 w-full disabled:bg-blue-300  py-2 px-4"
                type="submit"
                disabled={status === "loading"}
              >
                Update
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
};

export default UpdatePost;
