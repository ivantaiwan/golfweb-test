import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditGame = () => {
  const { id } = useParams(); // 取得 URL 中的球局 ID
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    course: '',
    prices: '',
    remarks: '',
  });
  const [loading, setLoading] = useState(true); // 設置加載狀態
  const navigate = useNavigate();

  useEffect(() => {
    // 獲取目前的球局資料
    const fetchGame = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/${id}`);
        setFormData({
          date: response.data.date.substring(0, 10), // 顯示為YYYY-MM-DD
          time: response.data.time,
          course: response.data.course,
          prices: response.data.prices,
          remarks: response.data.remarks,
        });
        setLoading(false); // 數據加載完成
      } catch (error) {
        console.error('無法獲取球局資料:', error);
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/games/${id}`, formData);
      alert('球局已更新');
      navigate('/'); // 更新完成後跳轉到主頁
    } catch (error) {
      console.error('更新失敗:', error);
      alert(error.response?.data?.message || '更新失敗');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/games/${id}`);
      alert('球局已刪除');
      navigate('/'); // 刪除後返回主頁
    } catch (error) {
      console.error('刪除失敗:', error);
      alert(error.response?.data?.message || '刪除失敗');
    }
  };

  if (loading) {
    return <div>正在加載球局數據...</div>; // 顯示加載狀態
  }

  return (
    <div>
      <h1>編輯球局</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>日期：</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>時間：</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>球場：</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>球資：</label>
          <input
            type="text"
            name="prices"
            value={formData.prices}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>備註：</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>
        <button type="submit">更新球局</button>
        <button type="button" onClick={handleDelete}>刪除球局</button>
      </form>
    </div>
  );
};

export default EditGame;
