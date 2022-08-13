import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../hooks/useAuth';
// import UserChart from '../../components/UserChart';
import { StyledHeader } from '../../styles/globalstyles';

const AdminDashboard = () => {
  const currentUser = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser.isAdmin) router.replace('/');
  }, [currentUser, router]);

  return (
    currentUser.isAdmin && (
      <>
        <Navbar></Navbar>
        <StyledHeader>Admin Dasbhoard</StyledHeader>
        {/* <UserChart></UserChart> */}
      </>
    )
  );
};

export default AdminDashboard;
