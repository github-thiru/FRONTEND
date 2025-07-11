import React,{useState,useEffect} from 'react';
import UserDash from '../Components/UserDash';

function UserDashboard() {

useEffect(() => {
  // Prevent back button
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };
}, []);

  return (
    <>
  
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>Welcome, User!</h1>
      {/* <p>This is your dashboard.</p> */}
    </div>
    
    <UserDash/>

      </>
  );
}

export default UserDashboard;
