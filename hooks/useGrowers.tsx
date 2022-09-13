import { useEffect, useState } from 'react';
import { getGrowers } from '../utils/cropData';
import { useAuth } from './useAuth';

export interface Grower {
  _id: string;
  phoneNumber: string;
  email: string;
  messageOptIn: boolean;
  __v: number;
  receiveReminders: boolean;
  lastReceivedPush: Date;
  username: string;
}

export interface SupervisorGrowersData {
  _id: string;
  users: Grower[];
}

const useGrowers = () => {
  const [growers, setGrowers] = useState<Grower[]>([]);
  const currentUser = useAuth();

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      const adminToken = localStorage.getItem('adminJWT');
      adminToken &&
        getGrowers(adminToken)
          .then((data) => {
            const growerData = data as SupervisorGrowersData;
            const growers = growerData?.users;
            if (Array.isArray(growers)) {
              setGrowers(growers);
            }
          })
          .catch((err) => console.log(err));
    }
  }, [currentUser]);

  return growers;
};

export default useGrowers;
