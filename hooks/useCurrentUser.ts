'use client';

import useSWR from 'swr';

import fetcher from '@libs/fetcher';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCurrentUser;