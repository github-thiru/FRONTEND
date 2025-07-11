import React, { useState } from 'react';
import Sidebar from './sidebar';
import BasicInfo from './BasicInfo';
import Education from './Education';
import AccountDetails from './AccountDetails';
import AddStudent from './components/AddStudent';
import AddSubject from './components/AddSubject';
import AddMarks from './components/AddMarks';

function UserDash() {
  const [activeTab, setActiveTab] = useState('BasicInfo');

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      <div style={{ flex: 1, padding: '30px' ,marginLeft:'35px'}}>
        {activeTab === 'BasicInfo' && <BasicInfo />}
        {activeTab === 'Education' && <Education />}
        {activeTab === 'AccountDetails' && <AccountDetails />}
          {activeTab === 'AddStudent' && <AddStudent />}
        {activeTab === 'AddSubject' && <AddSubject />}
        {activeTab === 'AddMarks' && <AddMarks />}
      </div>
    </div>
  );
}

export default UserDash;
