import express from "express";
import useRouter from "./routes/UserRouter";
import tweetRouter from "./routes/TweetRouter";

const app = express();

app.use(express.json());

app.use('/user', useRouter);

app.use('/tweet', tweetRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});



app.listen(3000, () => console.log("Server running on PORT:3000"));