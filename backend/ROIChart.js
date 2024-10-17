app.post('/api/roi', (req, res) => {
    const { costOfInvestment } = req.body;
    if (!costOfInvestment) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    roiData.push({ costOfInvestment }); 
    res.json({ message: 'ROI data added', data: roiData });
});
app.get('/api/generate-report', (req, res) => {
    res.json({
        message: 'Report generated successfully',
        data: roiData 
    });
});
