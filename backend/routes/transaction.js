const express = require("express");
const router = express.Router();
const auth = require("../auth");
const TransactionController = require("../controllers/transaction");

router.post("/", auth.verify, (req, res) => {
  TransactionController.add(req.body).then((result) => res.send(result));
});

router.get("/:userId", auth.verify, (req, res) => {
  TransactionController.getAll(req.params.userId).then((transactions) =>
    res.send(transactions)
  );
});

router.get("/single/:transactId", auth.verify, (req, res) => {
  console.log(req.params.transactId);
  const transactId = req.params.transactId;
  TransactionController.get({ transactId }).then((transaction) =>
    res.send(transaction)
  );
});

router.put("/", auth.verify, (req, res) => {
  TransactionController.update(req.body).then((result) => res.send(result));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log("Delete ID", id);
  TransactionController.delete({ id }).then((result) => res.send(result));
});

module.exports = router;
