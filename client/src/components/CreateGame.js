import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGame = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    course: '',
    prices: '',
    remarks: '',
  });

  const navigate = useNavigate(); // 初始化 useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data:', formData); // 打印表單數據
      await axios.post('/api/games/create', formData);
      alert('球局創建成功');
      navigate('/'); // 創建成功後跳轉到 Home 頁面
    } catch (error) {
      console.error('Error creating game:', error.response); //check error
      alert(error.response?.data?.message || '創建失敗');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="date" value={formData.date} onChange={handleChange} type="date" placeholder="日期" />
      <input name="time" value={formData.time} onChange={handleChange} type="time" placeholder="時間" />
      <input name="course" value={formData.course} onChange={handleChange} placeholder="球場" />
      <input name="prices" value={formData.prices} onChange={handleChange} placeholder="價格" />
      <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="備註"></textarea>
      <button type="submit">創建球局</button>
    </form>
  );
};

export default CreateGame;