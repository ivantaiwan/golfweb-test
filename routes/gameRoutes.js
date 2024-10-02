const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

router.get('/', async (req, res) => {
  try {

    const currentDate = new Date(); //獲取當前日期

    const games = await Game.find({ date: { $gte: currentDate } }).sort({ date: 1 }); // 獲取所有球局
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: '無法獲取球局' });
  }
});

// 建立球局
router.post('/create', async (req, res) => {
  
  try {
    console.log('Request received at /api/games/create');
    const { date, time, course, prices, remarks } = req.body;

    if (!date || !time || !course || !prices ) {
      return res.status(400).json({ message: '所有欄位都是必填的' });
    }

    //確認為當日以後的時間
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    if (selectedDateTime <= currentDateTime) {
      return res.status(400).json({ message: '日期和時間必須是未來的時間' });
    }

    const newGame = new Game({
      date,
      time,
      course,
      prices,
      remarks,
    });

    await newGame.save();
    res.status(201).json({message : '建立球局成功',newGame});
  } catch (error) {
    console.error('Error saving game:', error); //check error message
    res.status(500).json({ message: '建立球局失敗', error });
  }
});


// 修改球局
router.put('/:id', async (req, res) => {
  try {
    const { date, time, course, prices, remarks } = req.body;

    // 檢查日期和時間是否為未來
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    if (selectedDateTime <= currentDateTime) {
      return res.status(400).json({ message: '日期和時間必須是未來的時間' });
    }

    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      { date, time, course, prices, remarks },
      { new: true } // 返回更新後的 document
    );

    if (!updatedGame) {
      return res.status(404).json({ message: '找不到該球局' });
    }

    res.status(200).json(updatedGame);
  } catch (error) {
    console.error('修改球局失敗:', error);
    res.status(500).json({ message: '修改球局失敗', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id); // 根據ID查詢
    if (!game) {
      return res.status(404).json({ message: '找不到該球局' });
    }
    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ message: '無法獲取球局資料' });
  }
});

// 刪除球局
router.delete('/:id', async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    
    if (!deletedGame) {
      return res.status(404).json({ message: '找不到該球局' });
    }

    res.status(200).json({ message: '球局已刪除' });
  } catch (error) {
    console.error('刪除球局失敗:', error);
    res.status(500).json({ message: '刪除球局失敗', error });
  }
});


module.exports = router;
