import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
const app = express();
app.use(cors());
app.use("/images", express.static("images"));

app.get("/getimg", (req, res) => {
  const protocol = req.protocol;
  const host = req.get("host");
  const imgs = fs
    .readdirSync(path.join(__dirname, "images"))
    .filter((file) => /\.(png|jpe?g|gif)$/.test(file))
    .map((file) => ({
      url: `${protocol}://${host}/images/${file}`,
      name: file,
    }));
  res.send(imgs);
});

app.listen("10001", () => {
  console.log("biaoqingbao server running at http://127.0.0.1:10001.");
});
