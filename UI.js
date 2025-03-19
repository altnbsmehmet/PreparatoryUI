import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT;

// LiveReload Setup
const liveReloadServer = livereload.createServer({
    exts: ['ejs', 'css', 'js', 'html']
});
liveReloadServer.watch([
    path.join(__dirname, 'Views'),
    path.join(__dirname, 'public')
]);
app.use(connectLivereload());

// EJS Setup
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'Views'));
app.set('view cache', false);
app.disable('etag');

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Async Controller Import
(async () => {
    try {
        const files = await fs.promises.readdir('./Controllers');
        for (const file of files) {
            if (file.endsWith("Controller.js")) {
                const route = file.replace("Controller.js", "").toLowerCase();
                const controller = await import(`./Controllers/${file}`);
                app.use(`/${route}`, controller.default);
            }
        }
    } catch (err) {
        console.error("Error loading controllers:", err);
    }
})();

// Start Server
app.listen(port, () => {
    console.log(`UI: Server is running on port: ${port}`);
});

// Ensure LiveReload Works
let liveReloadConnected = false;
liveReloadServer.server.on("connection", () => {
    if (!liveReloadConnected) {
        console.log("🔥 LiveReload is running. Watching for file changes...");
        liveReloadConnected = true;
    }
});