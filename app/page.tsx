
import Form from "@Components/Form";
import Header from "@Components/Header";
import PostFeed from "@Components/posts/PostFeed";


export default function Home() {
  return (
    <>
    
    
    <Header label="home"/>
    <Form placeholder="What's happening?" />
    <PostFeed />
    </>
  )
}
