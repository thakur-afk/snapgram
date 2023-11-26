import Loader from "@/src/component/shared/Loader";
import { useUserContext } from "@/src/context/AuthContext";
import { getSavedByUser } from "@/src/lib/appwrite/api";
import { useGetSavedPost } from "@/src/lib/react-query/queriesAndMutations";
import GridPostList from "@/src/component/shared/GridPostList";
import React from "react";

const Saved = () => {
  const { user } = useUserContext();
  const { data: savedPost, isPending: isGettingSavedPost } = useGetSavedPost();
  console.log(savedPost);
  const newsavedPost = savedPost?.map((post) => post.post);
  console.log(newsavedPost);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className=" h3-bold md:h2-bold w-full">Search Posts</h2>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Saved Post</h3>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {isGettingSavedPost ? (
          <Loader />
        ) : (
          <>
            {newsavedPost && (
              <GridPostList
                posts={newsavedPost}
                showStats={false}
                showUser={false}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Saved;
