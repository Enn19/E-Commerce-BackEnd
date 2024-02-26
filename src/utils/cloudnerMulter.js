import multer from "multer";
export const fileValidation={
    image:["image/png","image/gif","image/jpeg"],
    pdf:["application/pdf"]
}
const uploadFile = ({ customValidation } = {}) => {
  const storage = multer.diskStorage({});
  
  const fileFilter = (req, file, cb) => {
    // console.log(req)
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid format"), false);
    }
  };
  
  const upload = multer({ fileFilter, storage });
  return upload;
};

export default uploadFile  