import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");

app.use(express.static('public'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
fs.readdir('./Controllers', (err, files) => {
    for (let i = 0; i < files.length; i++) {
        const file = files[i].replace("Controller.js", "");
        import(`./Controllers/${files[i]}`)
            .then(controller => app.use(`/${file.toLowerCase()}`, controller.default))
            .catch(err => console.log(err));
    }
});

app.listen(port, () => {
    console.log("UI: Server is running on port: " + port);
});