import express from "express"
import bootstrap from './src/bootStrab.js';
import { config } from "dotenv"
import cors from "cors"
const app = express()
config()
//mongodb+srv://eeenasmmm9hhamed:<password>@cluster0.lezuouj.mongodb.net/
// import QRCode from 'qrcode'

// QRCode.toDataURL('I am a pony!', function (err, url) {
//   console.log(url)
// })
// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

// if (process.env.MOOD == "DEV") {
//     app.use(cors(corsOptions))
// } else {
//     app.use(async (req, res, next) => {
//         if (!whitelist.includes(req.header("origin"))) {
//             return next(new Error("not allowed by cors  ", { cause: 502 }))
//         }
//         await res.header("Access-Control-Allow-Origin", "*")
//         await res.header("Access-Control-Allow-Header", "*")
//         await res.header("Access-Control-Allow-Private-Network", "true")
//         await res.header("Access-Control-Allow-Method", "*")
//         next()
//     })
// }
const port = +process.env.PORT
bootstrap(app, express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))