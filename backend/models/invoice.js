const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
  amount : { required: true, type : Number},
  purpose : { required: true, type : String},
  status : {required: true, type: String},
  invoiceID: {required: true, type:String},
  redirect: {required: true, type: String}
});

module.exports = mongoose.model('Invoice',invoiceSchema);

