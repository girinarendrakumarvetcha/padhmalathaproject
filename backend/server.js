const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 8080;
const db = require('./dbfolder/db');
const customerRouter = require('./routes/customer-router');
const auctionRouter = require('./routes/auction-router');
const amtCatalogRouter = require('./routes/amt_catalog-router');
const intervalRouter = require('./routes/installment_interval-router');
const drawGroupRouter = require('./routes/draw_group-router');
const drawMasterRouter = require('./routes/draw_master-router');
const drawInvoiceRouter = require('./routes/draw_invoice-router');
const drawInvoicePaymentRouter = require('./routes/draw_invoice_payment-router');
const drawMasterTransRouter = require('./routes/draw_master_trans-router');
const recordTransactionMasterRouter = require('./routes/record_transaction_master-router');
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/',(req,res) => {
    res.send('Helllo World');
});
app.get('/api',(req,res) => {
    res.send('Helllo World..!');
});
// console.log(amtCatalogRouter);
// console.log(customerRouter);
app.use('/api',customerRouter);
app.use('/api',auctionRouter);
app.use('/api',amtCatalogRouter);
app.use('/api',intervalRouter);
app.use('/api',drawGroupRouter);
app.use('/api',drawMasterRouter);
app.use('/api',drawInvoiceRouter);
app.use('/api',drawInvoicePaymentRouter);
app.use('/api',drawMasterTransRouter);
app.use('/api',recordTransactionMasterRouter);

app.listen(apiPort, () => console.log(`server runniong on port ${apiPort}`));


