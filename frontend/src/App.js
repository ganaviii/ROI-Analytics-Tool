import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, TextField, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart, registerables } from 'chart.js';
import './styles.css'; 


Chart.register(...registerables);

function App() {
    const [investments, setInvestments] = useState([]);
    const [cost, setCost] = useState('');
    const [report, setReport] = useState({});
    const [predictedReturn, setPredictedReturn] = useState(0);
    const [marketingStrategies, setMarketingStrategies] = useState([]);
    const [solution, setSolution] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [chatMessage, setChatMessage] = useState('');
    const [chatResponses, setChatResponses] = useState([]);

    useEffect(() => {
        fetchMarketingStrategies();
    }, []);

    const fetchMarketingStrategies = () => {
        const strategies = [
            { strategy: "Social Media Ads", cost: 2000, result: 5000 },
            { strategy: "SEO Optimization", cost: 1500, result: 3000 },
            { strategy: "Email Marketing", cost: 1000, result: 2500 },
        ];
        setMarketingStrategies(strategies);
    };

    const generateReport = () => {
        const totalInvestment = investments.reduce((acc, inv) => acc + inv.costOfInvestment, 0);
        const baseline = 50000; 
        const profitLoss = totalInvestment - baseline;
        setReport({ totalInvestment, profitLoss });
        predictInvestmentReturns(totalInvestment);
    };

    const predictInvestmentReturns = (totalInvestment) => {
        const predictionFactor = 1 + Math.random() * 0.3; 
        const predictedReturnValue = totalInvestment * predictionFactor;
        setPredictedReturn(predictedReturnValue);
    };

    const handleAddOrUpdateInvestment = () => {
        if (!cost) return;

        const investment = { id: investments.length + 1, costOfInvestment: parseFloat(cost) };

        if (editIndex !== null) {
            const updatedInvestments = investments.map((inv, index) => 
                index === editIndex ? investment : inv
            );
            setInvestments(updatedInvestments);
            setEditIndex(null);
        } else {
            setInvestments([...investments, investment]);
        }

        setCost('');
    };

    const handleEditInvestment = (index) => {
        setCost(investments[index].costOfInvestment);
        setEditIndex(index);
    };

    const handleDeleteInvestment = (index) => {
        const updatedInvestments = investments.filter((_, idx) => idx !== index);
        setInvestments(updatedInvestments);
    };

    const handleGenerateSolution = () => {
        const totalInvestment = report.totalInvestment || 0;
        const profitLoss = report.profitLoss || 0;

        let detailedSolution = '';

        if (profitLoss > 0) {
            detailedSolution += '1. Your investment is performing well! Consider reinvesting profits to grow your portfolio.\n';
            detailedSolution += '2. Explore additional marketing channels to maximize your reach.\n';
        } else {
            detailedSolution += '1. Review your marketing strategies to identify areas for improvement.\n';
            detailedSolution += '2. Consider reducing costs on less effective marketing channels.\n';
        }

        setSolution(detailedSolution);
    };

    const investmentChartData = {
        labels: investments.map((inv) => `Investment ${inv.id}`),
        datasets: [
            {
                label: 'Cost of Investment',
                data: investments.map((inv) => inv.costOfInvestment),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const marketingChartData = {
        labels: marketingStrategies.map((s) => s.strategy),
        datasets: [
            {
                label: 'Marketing Strategies ROI',
                data: marketingStrategies.map((s) => {
                    const investmentContribution = investments.reduce((acc, inv) => acc + (inv.costOfInvestment / 10000) * s.result, 0);
                    return investmentContribution;
                }),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    const handleLogin = () => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser && savedUser.username === username && savedUser.password === password) {
            setUser(savedUser);
            setUsername('');
            setPassword('');
        } else {
            alert('Invalid username or password');
        }
    };

    const handleSignup = () => {
        const newUser = { username, password };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        setUsername('');
        setPassword('');
    };

    const handleLogout = () => {
        setUser(null);
    };

    const handleChatSubmit = () => {
        if (!chatMessage) return;

        const response = generateChatResponse(chatMessage);
        setChatResponses([...chatResponses, { message: chatMessage, response }]);
        setChatMessage('');

        // Auto-delete message after 5 seconds
        setTimeout(() => {
            setChatResponses((prev) => prev.filter((_, index) => index !== 0));
        }, 5000);
    };

    const generateChatResponse = (message) => {
        const normalizedMessage = message.toLowerCase();
        if (normalizedMessage.includes('hi') || normalizedMessage.includes('hello')) {
            return 'Hello! How can I assist you today?';
        }
        if (normalizedMessage.includes('investment') || normalizedMessage.includes('profit')) {
            return 'I can help you analyze your investments. What do you need?';
        }
        if (normalizedMessage.includes('marketing')) {
            return 'Marketing strategies can significantly impact your ROI. Let\'s discuss them!';
        }
        return 'I am here to help! Please ask me anything related to your investments.';
    };

    return (
        <Container style={{ background: 'linear-gradient(to right, #e0f7fa, #ffffff)', minHeight: '100vh', padding: '20px' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {!user ? (
                    <Paper style={{ padding: '20px', marginTop: '20px' }}>
                        <Typography variant="h5" align="center">{isLogin ? 'Login' : 'Sign Up'}</Typography>
                        <Grid container spacing={2} style={{ marginTop: '20px' }}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                    style={{ marginBottom: '10px' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    style={{ marginBottom: '10px' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    onClick={isLogin ? handleLogin : handleSignup}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    style={{ marginTop: '10px' }}
                                >
                                    {isLogin ? 'Login' : 'Sign Up'}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    onClick={() => setIsLogin(!isLogin)}
                                    variant="text"
                                    fullWidth
                                    style={{ marginTop: '10px' }}
                                >
                                    {isLogin ? 'Create an account' : 'Already have an account? Login'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                ) : (
                    <div>
                        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: 'black' }}>
                            Welcome, {user.username}!
                        </Typography>

                        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', color: 'black' }}>
                            Total Investment: {report.totalInvestment || 0}
                        </Typography>
                        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', color: 'black' }}>
                            Profit/Loss: {report.profitLoss || 0}
                        </Typography>
                        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', color: 'black' }}>
                            Predicted Return: ${predictedReturn.toFixed(2)}
                        </Typography>

                        <TextField
                            label="Cost of Investment"
                            variant="outlined"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            color="primary"
                            style={{ marginBottom: '20px' }}
                        />
                        <Button onClick={handleAddOrUpdateInvestment} variant="contained" color="secondary" style={{ marginBottom: '20px' }}>
                            {editIndex !== null ? 'Update Investment' : 'Add Investment'}
                        </Button>

                        <Grid container spacing={2} style={{ marginTop: '20px' }}>
                            <Grid item xs={6}>
                                <Button onClick={generateReport} variant="contained" color="primary" fullWidth>
                                    Calculate Total Investment
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={generateReport} variant="contained" color="primary" fullWidth>
                                    Calculate Profit/Loss
                                </Button>
                            </Grid>
                        </Grid>

                        <Bar data={investmentChartData} style={{ marginTop: '20px' }} />
                        <Bar data={marketingChartData} style={{ marginTop: '20px' }} />

                        <Button onClick={handleGenerateSolution} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Generate Solution
                        </Button>
                        {solution && (
                            <Paper style={{ padding: '20px', marginTop: '20px' }}>
                                <Typography variant="h6" style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                                    Recommendations based on your investment:
                                </Typography>
                                <pre style={{ fontSize: '1.2em' }}>{solution}</pre>
                            </Paper>
                        )}

                        <Typography variant="h6" style={{ marginTop: '20px' }}>Chat with Assistant:</Typography>
                        <TextField
                            label="Ask a question..."
                            variant="outlined"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            style={{ marginBottom: '10px', width: '300px' }}
                        />
                        <Button onClick={handleChatSubmit} variant="contained" color="primary" style={{ marginBottom: '20px', marginLeft: '10px' }}>
                            Send
                        </Button>

                        {chatResponses.map((resp, index) => (
                            <Paper key={index} style={{ padding: '10px', margin: '10px 0' }}>
                                <Typography><strong>You:</strong> {resp.message}</Typography>
                                <Typography><strong>Assistant:</strong> {resp.response}</Typography>
                            </Paper>
                        ))}

                        {investments.map((inv, index) => (
                            <Paper key={inv.id} style={{ padding: '10px', margin: '10px 0' }}>
                                <Typography>Investment {inv.id}: ${inv.costOfInvestment}</Typography>
                                <Button onClick={() => handleEditInvestment(index)} variant="contained" color="primary" style={{ marginRight: '10px' }}>
                                    Edit
                                </Button>
                                <Button onClick={() => handleDeleteInvestment(index)} variant="contained" color="secondary">
                                    Delete
                                </Button>
                            </Paper>
                        ))}

                        <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
                            <Grid item>
                                <Button onClick={handleLogout} variant="contained" color="secondary">
                                    Logout
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </motion.div>
        </Container>
    );
}

export default App;
