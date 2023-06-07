import prisma from '@libs/prismadb'
import { NextResponse } from 'next/server';

interface IParams {
    userId?: string;
}

export const GET = async (
    request: Request,
    { params }: { params: IParams }
) => {

    try {
        const { userId } = params;

        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        })
        return NextResponse.json({ ...existingUser, followersCount })
        // return res.status(200).json({ ...existingUser, followersCount });

        // return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 