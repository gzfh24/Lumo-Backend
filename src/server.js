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
app.get('*', (req, res) => {
    return res.status(404).send("Not Found");
})

// global error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).send({error: err});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});