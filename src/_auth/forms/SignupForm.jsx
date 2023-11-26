import { Button } from "@/components/ui/button";
import Input from "@/src/component/Input";
import Loader from "@/src/component/shared/Loader";

import { avatars } from "@/src/lib/appwrite/config";

import { useToast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccountMutation,
  useSignInAccount,
} from "@/src/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/src/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { register, handleSubmit } = useForm();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccountMutation();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Sign up failed. Please try again.",
      });
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({ title: "Sign in Failed . Please try again." });
    }
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      navigate("/");
    } else {
      return toast({ title: "Sign up Failed. Please try Again." });
    }
  }

  return (
    <div className=" sm:w-[420px] flex-center flex-col">
      <img src="/assets/images/logo.svg" />
      <h2 className=" h3-bold md:h2-bold pt-3 sm:pt-4">Create a new account</h2>
      <p className=" text-light-3 small-medium md:base-regular">
        To use snapgram enter details
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-5 w-full mt-4 ">
          <Input
            label="Name"
            placeholder="enter your name"
            className="shad-input rounded-lg px-2"
            type="text"
            {...register("name", { required: true })}
          />
          <Input
            label="username"
            placeholder="enter username"
            className="shad-input rounded-lg px-2"
            type="text"
            {...register("username", { required: true })}
          />
          <Input
            label="Email"
            placeholder="enter your email"
            className="shad-input rounded-lg px-2"
            type="email"
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            placeholder="enter your password"
            type="password"
            className="shad-input rounded-lg px-2"
            {...register("password", { required: true })}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                {" "}
                <Loader />
                Loading..
              </div>
            ) : (
              "Signup"
            )}
          </Button>
          <p className="text-sm text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 ml-1 font-semibold">
              {" "}
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
