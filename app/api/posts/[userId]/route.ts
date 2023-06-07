import prisma from '@libs/prismadb'


interface IParams {
    userId?: string;
}

export const GET = async (request: Request,  { params }: { params: IParams }) => {
    try {
        
        const userId = params.userId

        let posts;

        if (userId && typeof userId === 'string') {
            posts = await prisma.post.findMany({
                where: {
                    userId
                },
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
            });
        } else {
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }


        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 