import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // 引入 Link 用來導航
import axios from 'axios';

const Home = () => {
  const [games, setGames] = useState([]);


  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games`, { headers: { 'Cache-Control': 'no-cache' } });
        console.log('獲取到的球局資料:', response.data); // 確認獲取到的數據
        setGames(response.data);
      } catch (error) {
        console.error('無法獲取球局', error);
      }
    };
    fetchGames();
  }, []);

  return (
    <div>
      <h1>所有球局</h1>
      <Link to="/create">
        <button>創建球局</button>  {/* 導向到 /create 頁面 */}
      </Link>

      {games.length === 0 ? (
        <p>目前沒有球局</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game._id}>
              <strong>日期:</strong> {new Date(game.date).toLocaleDateString()} <br />
              <strong>時間:</strong> {game.time} <br />
              <strong>球場:</strong> {game.course} <br />
              <strong>球資:</strong> {game.prices} <br />
              <strong>備註:</strong> {game.remarks || '無'} <br />
              <Link to={`/edit/${game._id}`}>
                <button>編輯</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
