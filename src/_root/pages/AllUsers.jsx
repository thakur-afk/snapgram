import Loader from "@/src/component/shared/Loader";
import UsersGrid from "@/src/component/shared/UsersGrid";
import { useUserContext } from "@/src/context/AuthContext";
import { getAllUsers } from "@/src/lib/appwrite/api";
import { useGetAllUsers } from "@/src/lib/react-query/queriesAndMutations";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const { user } = useUserContext();
  const { data: usersData, isPending: isLoadingAllUsers } = useGetAllUsers();

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className=" h3-bold md:h2-bold w-full">Discover People</h2>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Top Creator </h3>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {isLoadingAllUsers ? (
          <Loader />
        ) : (
          <div className="user-conatiner flex   gap-2 flex-wrap flex-1">
            {usersData &&
              usersData?.documents.map((item) => {
                if (item.$id !== user.id) {
                  return <UsersGrid key={item.name} user={item} />;
                }
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
