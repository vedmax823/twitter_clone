import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@libs/prismadb'

export const GET = async () => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
              createdAt: 'desc'
            }
        });

        return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 

export const PATCH = async (request : Request) => {
    try {
        const currentUser  = await getCurrentUser()
        const body = await request.json();
        const { name, username, bio, profileImage, coverImage } = body;
    
        if (!name || !username || !currentUser) {
          throw new Error('Missing fields');
        }
    
        const updatedUser = await prisma.user.update({
          where: {
            id: currentUser.id,
          },
          data: {
            name,
            username,
            bio,
            profileImage,
            coverImage
          }
        });
    
        return new Response(JSON.stringify(updatedUser), { status: 200 })
      } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts", { status: 500 })
      }
} 