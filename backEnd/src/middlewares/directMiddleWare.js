const redirectByRole = (req, res, next) => {
  const { role } = req.session.user;

  if (role === "admin") {
    res.redirect("/admin");
  } else if (role === "customer") {
    res.redirect("/customer");
  } else if (role === "salon") {
    res.redirect("/salon");
  } else {
    res.status(403).json({ message: "Không có quyền truy cập" });
  }
};

module.exports = {
  redirectByRole,
};
