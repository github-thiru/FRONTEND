const menuItems = [
  { key: 'AddStudent', label: 'Add Student' },
  { key: 'StudentList', label: 'Student List' }
];

function Sidebar({ setActiveTab, activeTab }) {
  return (
    <div style={{
      width: '250px',
      background: '#f0f0f0',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {menuItems.map(item => (
        <div
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          style={{
            padding: '10px',
            marginBottom: '10px',
            cursor: 'pointer',
            backgroundColor: activeTab === item.key ? '#ddd' : '#fff',
            borderRadius: '5px',
            fontWeight: activeTab === item.key ? 'bold' : 'normal'
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
