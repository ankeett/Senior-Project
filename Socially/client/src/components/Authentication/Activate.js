/*
Activate()
NAME
    Activate
SYNOPSIS
    Activate();
DESCRIPTION
    This React component handles the activation of a user's account using a token.
    It fetches data from the Redux store, dispatches an activation action, and redirects the user based on the activation status.
RETURNS
    Returns a React component that renders an empty <div>.
*/
import React from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { activateAccount } from '../../actions/userAction';

const Activate = () => {
  const dispatch = useDispatch();
  const { token } = useParams(); // Extract the token parameter from the URL.
  const navigate = useNavigate();
  const { error, success, isLoading, isActivated, user } = useSelector(state => state.user);

  useEffect(() => {
    // Dispatch the activateAccount action with the provided token.
    dispatch(activateAccount(token));
  }, []);

  useEffect(() => {
    // Redirect the user to the login page if there's an error.
    if (error) {
      navigate("/login");
    }

    // Redirect the user to the home page if the activation is successful.
    if (success && isActivated) {
      navigate("/home");
    }
  }, [dispatch, error, success, user, isActivated, isLoading]);

  return (
    <div>
      {/* This component doesn't render anything meaningful. */}
    </div>
  );
};

export default Activate;
