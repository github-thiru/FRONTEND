import React,{useEffect} from 'react';
import Sidebar from './components/Sidebar';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('AddStudent');

  useEffect(() => {
  // Prevent back button
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };
}, []);
  return (
    <>
   
    <div>
      <h1>Welcome, Admin!</h1>
      <p>This is the admin dashboard.</p>
    </div>

     <div style={{ display: 'flex' }}>
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      <div style={{ flex: 1, padding: '30px' }}>
        {activeTab === 'AddStudent' && <AddStudent />}
        {activeTab === 'StudentList' && <StudentList />}
      </div>
    </div>
     </>
  );
}

export default AdminDashboard;
