import React from 'react';

function Sidebar({ setActiveTab, activeTab }) {
  const menuItems = [
    { key: 'BasicInfo', label: 'Basic Information' },
    { key: 'Education', label: 'Education' },
    { key: 'AccountDetails', label: 'Account Details' },
      { key: 'AddStudent', label: 'Add Student' },
  { key: 'AddSubject', label: 'Add Subject' },
  { key: 'AddMarks', label: 'Add Marks' },
  ];

  return (
    <div style={{ width: '250px', padding: '20px', background: '#f9f9f9', borderRight: '1px solid #ddd' ,   border: '2px solid black',   height: '79vh', // 💡 use 100vh instead of 100%
      boxSizing: 'border-box',
      overflowY: 'auto' // optional scroll
}}>
      {menuItems.map((item) => (
        <div
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          style={{
            padding: '10px',
            marginBottom: '10px',
            cursor: 'pointer',
            backgroundColor: activeTab === item.key ? '#fff' : 'transparent',
            border: activeTab === item.key ? '1px solid orange' : 'none',
            borderRadius: '6px',
            color: activeTab === item.key ? 'orange' : 'black',
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
