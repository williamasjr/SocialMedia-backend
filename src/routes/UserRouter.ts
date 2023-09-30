import { Router } from "express";

const useRouter = Router();

// crude for user

// create user
useRouter.post("/", (req, res) => {
  res.status(501).jsonp({ error: "Not implemented" })
});

// get users
useRouter.get("/", (req, res) => {
  res.status(501).jsonp({ error: "Not implemented" })
});

// get one user
useRouter.post("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).jsonp({ error: `Not implemented: ${id}` })
});

// update one user
useRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).jsonp({ error: `Not implemented: ${id}` })
});

// delete user
useRouter.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).jsonp({ error: `Not implemented: ${id}` })
});

export default useRouter;