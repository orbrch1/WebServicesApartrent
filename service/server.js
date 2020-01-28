const Express = require('express');
const logger = require('morgan'); // NOTE: for debugging
const   {userRouter} = require('./routers/userRouter'),
        {reviewRouter} = require('./routers/reviewRouter'),
        {orderRouter} = require('./routers/orderRouter'),
        {offerRouter} = require('./routers/offerRouter'),
        {messageRouter} = require('./routers/messageRouter'),
        {apartmentRouter} = require('./routers/apartmentRouter'),
        {publicationRouter} = require('./routers/publicationRouter')
const app = Express();
const port = process.env.PORT || 3000;

// app.set('port', port);
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.get(
    (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
      res.set('Content-Type', 'application/json');
      next();
    });

//app.use('/user/*', userRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);
app.use('/review', reviewRouter);
app.use('/order', orderRouter);
app.use('/offer', offerRouter);
app.use('/apartment', apartmentRouter);
app.use('/publication', publicationRouter);

app.all('*', (req, res) => {
  res.status(404).send('Unsupported Route!');
})

//exception catch
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
   });
   
app.listen(port, () => console.log('Express server is running on port ', port));

