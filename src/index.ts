import express from "express";
import useRouter from "./routes/UserRouter";
import tweetRouter from "./routes/TweetRouter";
import authRouter from "./routes/authRouter";
import authenticationToken from "./middlewares/authenticationToken";

const app = express();
app.use(express.json());

app.use('/user', authenticationToken, useRouter);
app.use('/tweet', authenticationToken, tweetRouter);
app.use('/auth', authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => console.log("Server running on PORT:3000"));