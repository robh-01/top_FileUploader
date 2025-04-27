export function indexPageGet(req, res, next) {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.render("index", { user: req.user });
  }
}

export function signinPageGet(req, res, next) {
  res.render("signin");
}
