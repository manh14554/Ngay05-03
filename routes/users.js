const express = require('express');
const router = express.Router();
const { dataUser } = require('../utils/data2');

const findUserByUsername = (username) => dataUser.find(u => u.username === username);

// [GET] Lấy tất cả Users
router.get('/', (req, res) => res.json(dataUser));

// [GET] Chi tiết User
router.get('/:username', (req, res) => {
  const user = findUserByUsername(req.params.username);
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});

// [POST] Tạo User mới
router.post('/', (req, res) => {
  const { username, password, email, role } = req.body;
  if (!username || !password || !email || !role) 
    return res.status(400).json({ error: 'Missing fields' });
  if (findUserByUsername(username)) 
    return res.status(409).json({ error: 'User already exists' });

  const now = new Date().toISOString();
  const newUser = { ...req.body, loginCount: 0, creationAt: now, updatedAt: now };
  dataUser.push(newUser);
  res.status(201).json(newUser);
});

// [PUT] Cập nhật User
router.put('/:username', (req, res) => {
  const user = findUserByUsername(req.params.username);
  if (!user) return res.status(404).json({ error: 'User not found' });

  Object.assign(user, req.body);
  user.updatedAt = new Date().toISOString();
  res.json(user);
});

// [DELETE] Xóa User
router.delete('/:username', (req, res) => {
  const idx = dataUser.findIndex(u => u.username === req.params.username);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  res.json(dataUser.splice(idx, 1)[0]);
});

module.exports = router;