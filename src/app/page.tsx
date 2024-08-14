'use client';

import { useGetPools } from '@/clients/api';
// import { Subdirectory } from '@/constants/routing';
import { useAuth } from '@/context/AuthContext';
import { DashboardUi } from '@/pages/Dashboard';
// import { redirect } from 'next/navigation';
import { useState } from 'react';

const Dashboard: React.FC = () => {
  const { accountAddress } = useAuth();

  const [searchValue, setSearchValue] = useState('');

  const { data: getPoolData, isLoading: isGetPoolsLoading } = useGetPools({
    accountAddress,
  });

  // useEffect(() => {
  //   console.log('history.length', history.length);
  //   if (!!accountAddress && history.length <= 2) {
  //     redirect(Subdirectory.ACCOUNT);
  //   }
  // }, [location, accountAddress, history]);

  return (
    <DashboardUi
      pools={getPoolData?.pools || []}
      isFetchingPools={isGetPoolsLoading}
      searchValue={searchValue}
      onSearchInputChange={setSearchValue}
    />
  );
};

export default Dashboard;
