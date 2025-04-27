import { createUser } from "../db/queries.js";

import { userValidations } from "../validations/userValidations.js";
import { validationResult } from "express-validator";

export function indexPageGet(req, res, next) {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.render("index", { user: req.user });
  }
}

export function signinGet(req, res, next) {
  res.render("signin");
}

export const signinPost = [
  ...userValidations,
  async (req, res, next) => {
    const { errors } = validationResult(req);
    const { name, email, password } = req.body;
    const user = { name, email, password };

    if (errors.length != 0) {
      const errorMessage = errors[0].msg; //extracting only first error message

      return res.status(400).render("signin", {
        errorMessage, //send only one error message for clean ui
        previousInputs: { ...user },
      });
    }

    await createUser(user);
    res.redirect("login");
  },
];
