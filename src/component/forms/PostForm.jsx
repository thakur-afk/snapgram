import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Input from "@/src/component/Input";
import FileUploader from "../shared/FileUploader";
import {
  useCreatePost,
  useDeletePost,
  useUpdatePost,
} from "@/src/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/src/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import CustomFile from "../shared/customFileUpload";

const PostForm = ({ post, action }) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  async function onSubmit(values) {
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });
      if (!updatedPost) {
        toast({
          title: "please try again",
        });
      }
      return navigate(`/posts/${post.$id}`);
    }

    console.log(values);
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });
    if (!newPost) {
      toast({
        title: "please try again",
      });
    }
    navigate("/");
  }

  return (
    <div className="w-full">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-9 w-full max-w-5xl"
        >
          <label>Caption</label>
          <textarea
            className="shad-textarea custom-scrollbar p-2"
            {...register("caption")}
          />
          <label>Add Photo</label>
          {/* <FileUploader mediaUrl={post?.imageUrl} {...register("file")} /> */}
          {/* <CustomFileUpload {...register("file")} /> */}
          <CustomFile
            mediaUrl={post?.imageUrl}
            type="file"
            accept="image/*"
            {...register("file")}
          />
          <Input
            label="Add Location"
            placeholder=""
            type="location"
            className="shad-input p-2 rounded-sm"
            {...register("location")}
          />
          <Input
            label='Add Tags (separated by commas ",")'
            placeholder="Art,Coding,Exlpore..."
            type="tags"
            className="shad-input p-2 rounded-sm"
            {...register("tags")}
          />
          <div className=" flex gap-4 items-center justify-end">
            <Button type="button" className="shad-button_dark_4">
              Cancel
            </Button>
            <Button
              type="submit"
              className="shad-button_primary whitespace-nowrap"
              disabled={isLoadingCreate || isLoadingUpdate}
            >
              {isLoadingCreate || (isLoadingUpdate && "Loading...")}
              {action} Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
