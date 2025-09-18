const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());


const DATA_PATH = path.join(__dirname, 'data', 'mock_data.json');


function readData() {
const raw = fs.readFileSync(DATA_PATH, 'utf8');
return JSON.parse(raw);
}


app.get('/api/health', (req, res) => {
res.json({ status: 'ok', ts: new Date().toISOString() });
});


app.get('/api/sections', (req, res) => {
const data = readData();
res.json(data.sections);
});


app.get('/api/trains', (req, res) => {
const data = readData();
res.json(data.trains);
});


app.get('/api/conflicts', (req, res) => {
const data = readData();
res.json(data.conflicts);
});


app.get('/api/kpis', (req, res) => {
const data = readData();
res.json(data.kpis);
});


// simple endpoint to apply a suggestion (mock) — demonstrates override capability
app.post('/api/conflicts/:conflictId/apply', (req, res) => {
const { conflictId } = req.params;
// In real system you'd update DB and trigger re-optimization; here return success mock
res.json({ ok: true, conflictId, appliedAt: new Date().toISOString() });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));