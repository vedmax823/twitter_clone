import getCurrentUser from '@actions/getCurrentUser';

import prisma from '@libs/prismadb'

export const POST = async (request: Request) => {

    try {

        const currentUser = await getCurrentUser()
        if (!currentUser) throw new Error('No loginned')
        const { postId } = await request.json();

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new Error('Invalid ID');
        }

        let updatedLikedIds = [...(post.likedIds || [])];


        updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser?.id);

        // NOTIFICATION PART START
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId,
                }
            });

            if (post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: 'Someone liked your tweet!',
                        userId: post.userId
                    }
                });

                await prisma.user.update({
                    where: {
                        id: post.userId
                    },
                    data: {
                        hasNotification: true
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
        // NOTIFICATION PART END

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });


        return new Response(JSON.stringify(updatedPost), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}
