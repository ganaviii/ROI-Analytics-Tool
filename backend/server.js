const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const investments = [
    { id: 1, costOfInvestment: 1000 },
    { id: 2, costOfInvestment: 2000 },
];


const marketingData = [
    { value: 500 },
    { value: 1500 },
];


app.get('/api/roi', (req, res) => {
    res.json(investments);
});


app.get('/api/marketing-data', (req, res) => {
    res.json(marketingData);
});


app.get('/api/generative-solutions', (req, res) => {
    res.json([{ description: "Use AI to optimize ad spend" }, { description: "Analyze customer data for targeting" }]);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
