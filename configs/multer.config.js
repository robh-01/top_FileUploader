import multer from "multer";

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const date = Date.now();
    const randomUUID = crypto.randomUUID().split("-")[0];
    const extension = file.originalname.split(".").pop();
    const fileName = `${date}-${randomUUID}.${extension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export { upload };
