const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const clientRoutes = require('./routes/clients');
const taskRoutes = require('./routes/tasks');

app.use('/clients', clientRoutes);
app.use('/tasks', taskRoutes);

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});