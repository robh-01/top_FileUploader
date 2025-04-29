import {
  createUser,
  createFile,
  getFilesByUserId,
  getFileById,
} from "../db/queries.js";

import { userValidations } from "../validations/userValidations.js";
import { validationResult } from "express-validator";

import { passport } from "../configs/passport.config.js";

import { upload } from "../configs/multer.config.js";

export async function indexPageGet(req, res, next) {
  if (!req.user) {
    res.redirect("/login");
  } else {
    // if user is logged in, render the index page with user data and files
    const files = await getFilesByUserId(req.user.id);
    console.dir(files, { depth: null });
    res.render("index", { user: req.user, files });
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

export function loginGet(req, res, next) {
  res.render("login");
}

export const loginPost = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/failure",
  }),
];

export function logoutGet(req, res, next) {
  req.logout(function (err) {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
}

export const uploadPost = [
  upload.single("file_upload"),
  async (req, res, next) => {
    if (!req.user) {
      res.redirect("/login");
    }
    const file = req.file;
    const fileToEntryInDatabase = {
      originalName: file.originalname,
      serverName: file.filename,
      path: file.path,
      mimeType: file.mimetype,
      size: file.size,
      userId: req.user.id,
    };
    await createFile(fileToEntryInDatabase);
    res.redirect("/");
  },
];

export async function downloadGet(req, res, next) {
  const { fileId } = req.params;
  const file = await getFileById(fileId);
  if (!file) {
    return res.status(404).send("File not found");
  }
  if (file.userId !== req.user.id) {
    return res.status(403).send("You are not authorized to download this file");
  }
  res.download(file.path, file.originalName, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error downloading file");
    }
  });
}
