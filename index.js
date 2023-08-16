const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

const app = express();

app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text", (req, res) => {
    if (!req.files || !req.files.pdfFile) {
        res.status(400).end();
    }

    pdfParse(req.files.pdfFile)
        .then(result => {
            res.send(result.text);
        })
        .catch(error => {
            console.error("PDF Parsing Error:", error);
            res.status(500).send("An error occurred while parsing the PDF.");
        });
});



app.listen(4000);