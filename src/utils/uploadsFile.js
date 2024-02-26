import multer from "multer";
import { nanoid } from "nanoid";
export const fileValidation={
    image:["image/png","image/gif","image/jpeg"],
    pdf:["application/pdf"]
}
const uploadFile =({customValidation}={})=>{
    const storage = multer.diskStorage({
        destination:(req, file, cb)=> {
          cb(null, 'uploads')
        },
        filename: (req, file, cb)=> {
          const fileName =`${nanoid()}_${file.originalname}`
          file.finalDest=`uploads/${fileName}` 
                  cb(null,fileName )
        }
      })
      const fileFilter=(req,file,cb)=>{
        if(customValidation.includes(file.mimetype))
        {cb(null,true)
      }else{
        cb(new Error("invalid format"),false)
      }}
      
      const upload = multer({dest:"uploads", fileFilter,storage: storage })
      return upload
}
export default uploadFile 