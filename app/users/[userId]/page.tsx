"use client";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import PostFeed from "@Components/posts/PostFeed";
import Header from "@Components/Header";
import UserBio from "@Components/users/UserBio";
import UserHero from "@Components/users/UserHero";

interface IParams {
    userId: string;
  }

const UserView = ({ params }: { params: IParams }) => {

  const { data: fetchedUser, isLoading } = useUser(params.userId);
  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={params.userId} />
      <UserBio userId={params.userId} />
      <PostFeed userId={params.userId} />
    </>
   );
}
 
export default UserView;