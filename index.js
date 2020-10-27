const express = require("express");
const app = express();
const db = require("./db");

//boilerplate code from the notes "Image Upload" //

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

//// end of boilerplate ////

app.use(express.static("public"));
//it will look for an index.html file in the public folder and if there is, it will render that

app.get("/images", (req, res) => {
    db.getImages().then(({ rows }) => {
        // console.log(rows);
        res.json(rows);
    });
});

app.post("/upload", uploader.single("file"), (req, res) => {
    // when I make a post request, before it runs the code, I want it to upload to our hard drive.
    // hence why we need the uploader thing from multer.
    // this means: ADD it to my uploads folder
    // multer add the file and the body to the request object!
    // console.log("input values: ", req.body);
    // console.log("file: ", req.file);
    if (req.file) {
        res.json({
            success: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.listen(8000, () => console.log("Ini's server up and running"));
