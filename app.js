const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongo');
const entryRoutes = require('./routes/entryRoutes');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS for all routes
app.use('/api', entryRoutes); // Update route path if needed

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
