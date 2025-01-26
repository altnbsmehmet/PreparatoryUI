import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 6420;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
fs.readdir('./Controllers', (err, files) => {
    for (let i = 0; i < files.length; i++) {
        import(`./Controllers/${files[i]}`)
            .then(controller => app.use('/', controller.default))
            .catch(err => console.log(err));
    }
});

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});