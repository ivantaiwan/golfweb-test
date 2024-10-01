import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateGame from './components/CreateGame';
import EditGame from './components/EditGame';

function App() {
  return (
    <Router>
      <div>
        {/* 路由定義 */}
        <Routes>
          {/* 根路徑 "/" 會顯示 Home 組件 */}
          <Route path="/" element={<Home />} />
          {/* "/create" 路徑會顯示 CreateGame 組件 */}
          <Route path="/create" element={<CreateGame />} />
          <Route path="/edit/:id" element={<EditGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
