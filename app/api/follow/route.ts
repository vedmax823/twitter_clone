import getCurrentUser from "@actions/getCurrentUser";

import prisma from '@libs/prismadb'

export const POST = async (request: Request) => {
    try {

        const body = await request.json()
        const { userId } = body;

        const currentUser = await getCurrentUser()


        if (!currentUser) throw new Error('No user')


        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error('Invalid ID');
        }

        let updatedFollowingIds = [...(user.followingIds || [])];


        updatedFollowingIds.push(userId);



        // NOTIFICATION PART START

        await prisma.notification.create({
            data: {
                body: 'Someone followed you!',
                userId,
            },
        });

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hasNotification: true,
            }
        });

        const updatedUser = await prisma.user.update({
            where: {
              id: currentUser.id
            },
            data: {
              followingIds: updatedFollowingIds
            }
        });
        return new Response(JSON.stringify(updatedUser), { status: 200 })


    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}


