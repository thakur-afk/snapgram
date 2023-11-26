import { useUserContext } from "@/src/context/AuthContext";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import Input from "@/src/component/Input";

import CustomFile from "@/src/component/shared/customFileUpload";
import { useUpdateProfile } from "@/src/lib/react-query/queriesAndMutations";
import { useToast } from "@/components/ui/use-toast";

const ProfileForm = ({ user }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync: updateProfile, isPending: isLoadingUpdate } =
    useUpdateProfile();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      bio: user ? user?.bio : "",
      name: user ? user?.name : "",
      username: user ? user.username : "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
    const updatedPost = await updateProfile({
      ...values,
      postId: user.id,
      imageId: user?.imageId,
      imageUrl: user?.imageUrl,
    });
    if (!updatedPost) {
      toast({
        title: "please try again",
      });
    }
    return navigate(`/`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col gap-9 w-full max-w-5xl"
    >
      <div className="flex items-center gap-4">
        <div className="w-32">
          <img src={user?.imageUrl} className=" rounded-full" />
        </div>
        <div>
          <p>User mail</p>
          <p className="base-medium lg:body-bold text-light-1">{user?.email}</p>
        </div>
      </div>
      <Input
        label="name"
        placeholder=""
        type="text"
        className="shad-input p-2 rounded-sm"
        {...register("name")}
      />
      <Input
        label="username"
        type="text"
        className="shad-input p-2 rounded-sm"
        {...register("username")}
      />
      <Input
        label="Bio"
        placeholder=""
        type="text"
        className="shad-input p-2 rounded-sm"
        {...register("bio")}
      />

      <label>Add Photo</label>

      <CustomFile
        mediaUrl={user?.imageUrl}
        type="file"
        accept="image/*"
        {...register("file")}
      />

      <div className=" flex gap-4 items-center justify-end">
        <Button
          type="button"
          className="shad-button_dark_4"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="shad-button_primary whitespace-nowrap"
          disabled={isLoadingUpdate}
        >
          {isLoadingUpdate && "Loading..."}
          Update
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
