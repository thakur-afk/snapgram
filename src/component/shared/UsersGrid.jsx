import { Button } from "@/components/ui/button";
import React from "react";

const UsersGrid = ({ user }) => {
  return (
    <div className="user-card">
      <div className=" w-24 h-24 lg:w-40 flex-center">
        <img
          width={70}
          height={70}
          src={user?.imageUrl}
          className=" rounded-full "
        />
      </div>

      <div className=" flex flex-col justify-center items-center w-full">
        <p className="base-medium lg:body-bold text-light-1"> {user.name}</p>
        <p className="subtle-semibold lg:small-regular">@{user.username}</p>
      </div>
      <Button className="shad-button_primary w-full">Follow</Button>
    </div>
  );
};

export default UsersGrid;
