import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession as getServerSessionNextAuth } from 'next-auth';

export const getServerSession = () => getServerSessionNextAuth(authOptions);
