import prisma from '@libs/prismadb'

interface IParams {
    userId?: string;
}
export const GET = async (request : Request, { params }: { params: IParams }) => {
    try{
        const {userId} = params
        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
          }
      
          const notifications = await prisma.notification.findMany({
            where: {
              userId,
            },
            orderBy: {
              createdAt: 'desc'
            }
          });
      
          await prisma.user.update({
            where: {
              id: userId
            },
            data: {
              hasNotification: false,
            }
          });
          return new Response(JSON.stringify(notifications), { status: 200 })
    }
    catch(error){
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
    
}