const express = require("express");
const app = express();
const db = require("./db");

app.use(express.static("public"));
//it will look for an index.html file in the public folder and if there is, it will render that

app.get("/images", (req, res) => {
    db.getImages().then(({ rows }) => {
        // console.log(rows);
        res.json(rows);
    });
});

app.listen(8000, () => console.log("Ini's server up and running"));
