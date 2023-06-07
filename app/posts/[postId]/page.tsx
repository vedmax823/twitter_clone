"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";

import Header from "@Components/Header";
import Form from "@Components/Form";
import PostItem from "@Components/posts/PostItem";
import CommentFeed from "@Components/posts/CommentFeed";

interface IParams {
    postId?: string;
  }

const PostView = ({ params }: { params: IParams }) => {

    const {postId} = params;


    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if (isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label="Tweet" />
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Tweet your reply" />
            <CommentFeed comments={fetchedPost?.comments} />
        </>
    );
}

export default PostView;