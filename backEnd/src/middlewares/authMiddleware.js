const authorize = (roles) => (req, res, next) => {
  const { role } = req.user;

  // Kiểm tra vai trò của người dùng có nằm trong danh sách các vai trò được phép hay không
  if (role && roles.includes(role)) {
    next();
  } else {
    res.status(403).json({ message: 'Không có quyền truy cập' });
  }
};

module.exports = {
  authorize
};
