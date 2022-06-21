import React, { useEffect } from 'react';
import { logout } from '../../../redux/user/userSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function Logout() {
  const dispatch = useDispatch()
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(logout())
    navigate("/")
  }, [])

  return null
};

export default Logout
