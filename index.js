const Express = require('express');
const logger = require('morgan'); // NOTE: for debugging
const   {userRouter} = require('./routers/userRouter'),
        {reviewRouter } = require('./routers/reviewRouter'),
        {orderRouter} = require('./routers/orderRouter'),
        {apartmentRouter} = require('./routers/apartmentRouter')
const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(logger('dev'));

// require('./db_connections');

app.use('/user', userRouter);
app.use('/review', reviewRouter);
app.use('/order', orderRouter);
app.use('/apartment', apartmentRouter);
// app.use('/account', orderRouter);


//exception catch
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
   });
   
app.listen(port, () => console.log('Express server is running on port ', port));

// <!DOCTYPE html>
// <html>
// <head>
//     <title>current apartment</title>
//     <meta charset="uft-8"/>
//     <link rel="stylesheet" type="text/css" href="css/style.css"></link>
//     <script type="text/javascript" src="js/jquery.min.js"></script>
//     <script type="text/javascript" src="js/script.js"></script>
// </head>
// <body>
//     <h2 id="address" class="address"> Enter address below</h2>
//     <form id="form-container" class="form-container">
//         <label for="street">Street </label><input type="text" id="street" value=""></input>
//         <label for="city">City </label><input type="text" id="city" value=""></input>
//         <label for="country">Country </label><input type="text" id="Country" value=""><img class="photo" id="photo"></img></input>      
//     </form>
// </body> 
// </html>