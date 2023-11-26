import { Button } from "@/components/ui/button";
import GridPostList from "@/src/component/shared/GridPostList";
import Loader from "@/src/component/shared/Loader";
import { useUserContext } from "@/src/context/AuthContext";

import { useGetPostByUser } from "@/src/lib/react-query/queriesAndMutations";

import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  const { user } = useUserContext();
  const [LikeSwitch, setLikeSwitch] = useState(false);

  const { data: posts, isPending: isGettingUsersPost } = useGetPostByUser();

  const totalLikes = posts?.reduce((sum, post) => sum + post.likes.length, 0);

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex justify-between w-full">
          <div className="flex gap-5 items-center">
            <img
              src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
              alt="profile photo"
              className="h-14 w-14  md:w-28 md:h-28 rounded-full"
            />
            <div className=" flex flex-col gap-2">
              <div>
                <p className="body-bold h3-bold md:h2-bold ">{user.name}</p>
                <p className=" small-regular text-light-3">@{user.username}</p>
              </div>
              <div>
                <p>{user?.bio}</p>
              </div>

              <div className="flex gap-4">
                <p className="small-regular text-light-3">
                  {posts?.length || 0} Posts
                </p>
                <p className="small-regular text-light-3">
                  {totalLikes || 0} Likes
                </p>
              </div>
            </div>
          </div>
          <Button className="shad-button_dark_4">
            <Link
              to={`/update-profile/${user.id}`}
              className="flex justify-center items-center gap-1 bg-gray p-1 rounded-lg"
            >
              <img src="/assets/icons/edit.svg" width={24} height={24} />
              <p>EditProfile</p>
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex">
        <NavLink
          to=""
          className={`${!LikeSwitch ? "bg-slate-600 rounded-lg" : ""}`}
        >
          <Button onClick={() => setLikeSwitch(false)}>
            <img src="/assets/icons/posts.svg" />
            <p className="ml-1">Posts</p>
          </Button>
        </NavLink>
        <NavLink
          to="LikedPosts"
          className={({ isActive }) =>
            isActive ? " bg-slate-600 rounded-lg" : ""
          }
        >
          <Button onClick={() => setLikeSwitch(true)}>
            <img src="/assets/icons/like.svg" />
            <p className=" ml-1"> Liked Post</p>
          </Button>
        </NavLink>
      </div>
      {LikeSwitch ? (
        <Outlet />
      ) : (
        <div>
          {isGettingUsersPost ? (
            <Loader />
          ) : (
            <>
              {posts.length > 0 ? (
                <GridPostList posts={posts} showUser={false} />
              ) : (
                <div>NO POST YET</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
