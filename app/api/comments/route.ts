import getCurrentUser from '@actions/getCurrentUser';

import prisma from '@libs/prismadb'


export const POST = async (request: Request) => {
    try {

        const currentUser = await getCurrentUser()
        if (!currentUser) throw new Error('No loginned')
        const { body } = await request.json();

        const {searchParams} = new URL(request.url);
        const postId = searchParams.get("postId");

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        const comment = await prisma.comment.create({
            data: {
                body,
                userId: currentUser.id,
                postId
            }
        });

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
                        body: 'Someone replied on your tweet!',
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
        }
        catch (error) {
            console.log(error);
        }



        return new Response(JSON.stringify(comment), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}