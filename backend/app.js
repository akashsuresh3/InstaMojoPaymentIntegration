const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');

const Insta = require('instamojo-nodejs');

const Invoice = require('./models/invoice');

const app = express();
const url = require('url');


mongoose.connect("mongodb+srv://akash:P21sMgy9hN1e0y5C@cluster0.jidg4ct.mongodb.net/instaMojo?retryWrites=true&w=majority")
 .then(() => {
  console.log("Database connected!");
 })
 .catch(() => {
  console.log("Connection failed");
 })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", express.static(path.join(__dirname,"angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});



app.post("/api/invoices", (req,res,next) => {


  Insta.setKeys('test_8ba92b97b190d1a5220661390d6', 'test_b9052c95d8dd0a6ffd7a180bbc2');


  const data = new Insta.PaymentData();
	Insta.isSandboxMode(true);

	data.purpose =  req.body.purpose;
	data.amount = req.body.amount;
	data.buyer_name =  "akash";
	data.redirect_url =  "http://localhost:3000/api/callback?user_id=${user.id}";
	data.email =  "ak@g.com";
	data.phone =  "9898989898";
	data.send_email =  false;
	data.webhook= 'http://www.example.com/webhook/';
	data.send_sms= false;
	data.allow_repeated_payments =  false;

	Insta.createPayment(data, function(error, response) {
		if (error) {
			// some error
      console.log(error);
		} else {
			// Payment redirection link at response.payment_request.longurl
      console.log(response)
			const responseData = JSON.parse( response );
			// const redirectUrl = responseData.payment_request.longurl;
			// console.log( redirectUrl );

			// res.status( 200 ).json( redirectUrl );

      const invoice = new Invoice({
        amount: req.body.amount,
        purpose: req.body.purpose,
        invoiceID: responseData.payment_request.id,
        status: responseData.payment_request.status,
        redirect: responseData.payment_request.longurl
      });
      invoice.save();

       // console.log(invoice);
      res.status(201).json({
        message: "Post added successfully",
        redirect: responseData.payment_request.longurl
      });
		}
	});


})

app.get('/api/callback/', async ( req, res ) => {
	let url_parts = url.parse( req.url, true),
		responseData = url_parts.query;

  console.log(responseData);

	if ( responseData.payment_status != 'Failed' ) {
		// let userId = responseData.user_id;

		// Save the info that user has purchased the bid.
		// const bidData = {};
		// bidData.package = 'Bid100';
		// bidData.bidCountInPack = '10';

		// User.findOneAndUpdate( { _id: userId }, { $set: bidData }, { new: true } )
		// 	.then( ( user ) => res.json( user ) )
		// 	.catch( ( errors ) => res.json( errors ) );

		// Redirect the user to payment complete page.
    // const invoice = new Invoice({});
    const result = await Invoice.updateOne({invoiceID:{ $eq: responseData.payment_request_id}}, {$set : {status: "Success"}})
    // console.log(result);
		// return res.redirect('http://localhost:4200' );
	}

  return res.redirect('http://localhost:3000' );

} );

// const updateDocument = async()

app.get("/api/invoices",(req,res,next) => {

  // const invoices = [
  //   {id: "jhwbc", purpose: "grapes", amount: 250},
  //   {id: "wcwwc", purpose: "apple", amount: 130}
  // ]

  Invoice.find().then(documents => {
    res.status(200).json({
      message: "posts fetched successfully",
      invoices:documents});
  })
})

app.use((req,res,next) => {
  res.sendFile(path.join(__dirname,"angular","index.html"));
})


module.exports = app;
