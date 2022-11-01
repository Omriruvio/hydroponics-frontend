import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAdminDetails, getCurrentUser } from '../utils/auth';
import { useAuth } from './useAuth';

const useToken = () => {
  const currentUser = useAuth();
  const router = useRouter();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminJWT');
    const userToken = localStorage.getItem('jwt');
    if (adminToken) {
      getAdminDetails(adminToken)
        .then((adminDetails) => {
          const { email } = adminDetails as { email: string };
          setAdminToken(adminToken);
          currentUser.login({ email, isAdmin: true });
          // router.replace('/admin-dashboard');
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('adminJWT');
          setAdminToken(null);
          router.replace('/admin-signin');
        });
    } else if (userToken) {
      getCurrentUser(userToken)
        .then((userDetails) => {
          const { email, phoneNumber } = userDetails as { email: string; phoneNumber: string };
          setUserToken(userToken);
          currentUser.login({ email, phoneNumber, isAdmin: false });
        })
        .catch((err) => {
          console.log(err);
          // delete the token if it's invalid
          localStorage.removeItem('jwt');
          setUserToken(null);
          router.replace('/user-signin');
        });
    }
  }, [router, currentUser]);

  return { userToken, adminToken };
};

export default useToken;
