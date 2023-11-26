import GridPostList from "@/src/component/shared/GridPostList";
import Loader from "@/src/component/shared/Loader";
import { useGetLikedByUser } from "@/src/lib/react-query/queriesAndMutations";

const LikedPosts = () => {
  const { data: LikedPosts, isPending: isGettingLikes } = useGetLikedByUser();
  return (
    <div>
      {isGettingLikes ? (
        <Loader />
      ) : (
        <>
          {LikedPosts.length > 0 ? (
            <GridPostList posts={LikedPosts} showStats={false} />
          ) : (
            <div>NO Liked Post</div>
          )}
        </>
      )}
    </div>
  );
};

export default LikedPosts;
