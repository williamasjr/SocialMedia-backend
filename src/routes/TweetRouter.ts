import { Router } from "express";

const tweetRouter = Router();


tweetRouter.post("/", (req, res) => {
  res.status(501).jsonp({ error: "Not implemented" })
});

tweetRouter.get("/", (req, res) => {
  res.status(501).jsonp({ error: "Not implemented" })
});

tweetRouter.post("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).jsonp({ error: `Not implemented: ${id}` })
});

tweetRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).jsonp({ error: `Not implemented: ${id}` })
});

tweetRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).jsonp({ error: `Not implemented: ${id}` })
});

export default tweetRouter;