import prisma from '@libs/prismadb'

interface IParams {
    postId?: string;
}

export const GET = async (request: Request, { params }: { params: IParams }) => {
    try {

        const postId = params.postId


        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
            },
        });
        return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 
