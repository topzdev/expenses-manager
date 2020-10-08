const Transaction = require("../models/Transaction");

module.exports.add = (params) => {
  let transaction = new Transaction({
    name: params.name,
    type: params.type,
    amount: params.amount,
    income: params.income,
    userId: params.userId,
  });

  return transaction.save().then((transaction, err) => {
    return err ? false : true;
  });
};

module.exports.getAll = (id) => {
  return Transaction.find({ userId: id }).then((transactions) => transactions);
};

module.exports.get = (params) => {
  return Transaction.findById(params.transactId).then(
    (transaction) => transaction
  );
};

module.exports.update = (params) => {
  const updates = {
    name: params.name,
    type: params.type,
    amount: params.amount,
    income: params.income,
  };

  return Transaction.findByIdAndUpdate(params.id, updates).then((doc, err) => {
    return err ? false : true;
  });
};

module.exports.delete = async (params) => {
  if (!params.id) return false;

  const del = await Transaction.findByIdAndDelete(params.id);

  console.log(del);
  return true;
};
