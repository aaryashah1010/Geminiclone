import React from 'react';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Main from './components/Main/Main.jsx';

const App = () => {
  return (
    <div style={{ display: 'flex' }}> {/* Flex layout to position sidebar and main side by side */}
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
