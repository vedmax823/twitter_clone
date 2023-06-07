import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@libs/serverAuth';
import getCurrentUser from '@actions/getCurrentUser';

export const GET = async (request : Request) => {
  try {

    const currentUser  = await getCurrentUser()

    return new Response(JSON.stringify(currentUser), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch all prompts", { status: 500 })
  }
} 