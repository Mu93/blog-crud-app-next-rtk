"use client";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { FormLayout, FormRow, Button } from "@/app/components";
import { addPostValidationSchema } from "@/app/constants/FormValidation";
import { addPost } from "@/app/store/slices/posts/postsAsyncThunks";

const CreateNewPost = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(addPost(values));
    resetForm();
    setSubmitting(false);
  };

  const initialValues = {
    title: "",
    body: "",
  };

  return (
    <FormLayout title="CreatePostPage">
      <Formik
        initialValues={initialValues}
        validationSchema={addPostValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm, values }) => (
          <Form>
            <FormRow name="title" label="Title" value={values.title} />

            <FormRow name="body" label="Body" value={values.body} />

            <div>
              <Button
                className="bg-blue-500 text-white mr-3 w-full disabled:bg-blue-300  py-2 px-4"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
};

export default CreateNewPost;
