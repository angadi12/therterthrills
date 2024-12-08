// hooks/useDeviceId.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDeviceId } from '@/lib/Redux/couponSlice';
import { getDeviceId } from '@/lib/getDeviceId';

const useDeviceIdHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDeviceId = async () => {
      const deviceId = await getDeviceId();
      dispatch(setDeviceId(deviceId));
    };
    fetchDeviceId();
  }, [dispatch]);
};

export default useDeviceIdHook;
