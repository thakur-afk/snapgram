import { Button } from "@/components/ui/button";
import Input from "@/src/component/Input";
import Loader from "@/src/component/shared/Loader";

import { useToast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "@/src/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/src/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { register, handleSubmit } = useForm();

  // const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
  //   useCreateUserAccountMutation();

  const { mutateAsync: signInAccount, isPending: isLogin } = useSignInAccount();

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({
        title: "Login in Failed . Please try again. session not created",
      });
    }
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      navigate("/");
    } else {
      return toast({ title: "login up Failed. Please try Again." });
    }
  }

  return (
    <div className=" sm:w-[420px] flex-center flex-col">
      <img src="/assets/images/logo.svg" />
      <h2 className=" h3-bold md:h2-bold pt-3 sm:pt-4">
        Login To Your account
      </h2>
      <p className=" text-light-3 small-medium md:base-regular">
        Welcome back, please enter details
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-5 w-full mt-4 ">
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
            {isUserLoading ? (
              <div className="flex-center gap-2">
                {" "}
                <Loader />
                Loading..
              </div>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-sm text-light-2 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-primary-500 ml-1 font-semibold">
              {" "}
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
