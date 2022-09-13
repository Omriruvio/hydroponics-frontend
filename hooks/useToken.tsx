import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAdminDetails, getCurrentUser } from '../utils/auth';
import { useAuth } from './useAuth';

const useToken = () => {
  const currentUser = useAuth();
  const router = useRouter();
  useEffect(() => {
    const adminToken = localStorage.getItem('adminJWT');
    const userToken = localStorage.getItem('jwt');
    if (adminToken) {
      getAdminDetails(adminToken)
        .then((adminDetails) => {
          const { email } = adminDetails as { email: string };
          currentUser.login({ email, isAdmin: true });
          router.replace('/admin-dashboard');
        })
        .catch((err) => {
          console.log(err);
          router.replace('/admin-signin');
        });
    } else if (userToken) {
      getCurrentUser(userToken)
        .then((userDetails) => {
          const { email, phoneNumber } = userDetails as { email: string; phoneNumber: string };
          currentUser.login({ email, phoneNumber, isAdmin: false });
          router.replace('/user-dashboard');
        })
        .catch((err) => {
          console.log(err);
          router.replace('/user-signin');
        });
    } else if (!currentUser.isLoggedIn) router.replace('/signin');
  }, [router, currentUser]);
};

export default useToken;
