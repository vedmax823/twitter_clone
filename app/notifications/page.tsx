"use client"

import Header from "@Components/Header";
import NotificationsFeed from "@Components/NotificationsFeed";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



const Notifications = () => {
    const session = useSession()
    const router = useRouter()

    if (!session) {
      router.push('/home')
    }
  return ( 
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
   );
}
 
export default Notifications;