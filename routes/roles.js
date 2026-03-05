const express = require('express');
const router = express.Router();
const { dataRole, dataUser } = require('../utils/data2');

// Helper
const findRoleById = (id) => dataRole.find(r => r.id === id);

// [GET] Lấy tất cả Roles
router.get('/', (req, res) => res.json(dataRole));

// [GET] Lấy tất cả users thuộc một Role cụ thể (PHẢI ĐẶT TRƯỚC /:id)
router.get('/:id/users', (req, res) => {
  const roleId = req.params.id;
  
  const role = findRoleById(roleId);
  if (!role) {
      // Trả về rõ lý do ID nào bị lỗi để dễ debug
      return res.status(404).json({ error: `Không tìm thấy Role với ID là: ${roleId}` });
  }
  
  const users = dataUser.filter(u => u.role && u.role.id === roleId);
  res.json(users);
});

// [GET] Chi tiết 1 Role
router.get('/:id', (req, res) => {
  const role = findRoleById(req.params.id);
  role ? res.json(role) : res.status(404).json({ error: 'Role not found' });
});

// [POST] Tạo Role mới
router.post('/', (req, res) => {
  const { id, name, description } = req.body;
  if (!id || !name) return res.status(400).json({ error: 'Missing fields' });
  if (findRoleById(id)) return res.status(409).json({ error: 'Role already exists' });

  const now = new Date().toISOString();
  const newRole = { id, name, description, creationAt: now, updatedAt: now };
  dataRole.push(newRole);
  res.status(201).json(newRole);
});

// [PUT] Cập nhật Role
router.put('/:id', (req, res) => {
  const role = findRoleById(req.params.id);
  if (!role) return res.status(404).json({ error: 'Role not found' });

  const { name, description } = req.body;
  if (name) role.name = name;
  if (description) role.description = description;
  role.updatedAt = new Date().toISOString();
  res.json(role);
});

// [DELETE] Xóa Role
router.delete('/:id', (req, res) => {
  const idx = dataRole.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Role not found' });
  const deleted = dataRole.splice(idx, 1);
  res.json(deleted[0]);
});

module.exports = router;