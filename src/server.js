const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// 404 handler
app.use('*', (req, res) => {
    return res.status(404).send("Not Found");
})

// global error handler
app.use((err, req, res, next) => {

    const defaultErr = {
      log: "Express error handler caught unknown middleware error.",
      status: 500,
      message: { err: "An unexpected error occurred." },
      origin: "Unknown",
      type: "Unknown Error"
    };
    
    const errorObj = {...defaultErr, ...err};
    console.error(`Error [${errorObj.type}] at ${errorObj.origin}: ${errorObj.message.err || err.message}`);
  
    return res.status(errorObj.status).json({
      error: errorObj.message.err || "An error occured",
      location: errorObj.origin,
      type: errorObj.type
    });
    
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});