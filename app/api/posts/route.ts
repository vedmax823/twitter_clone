import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@libs/prismadb'


export const GET = async (request: Request) => {
    try {
        let posts;
        posts = await prisma.post.findMany({
            include: {
                user: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

export const POST = async (request: Request) => {
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser) throw new Error('No loginned')
        const {body} = await request.json();
        // const { body } = body;

        const post = await prisma.post.create({
            data: {
                body,
                userId: currentUser.id
            }
        });

        return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 