const express = require('express');
const {
    supportWorkers,
    visits
} = require('./mockdata.js');

const PORT_NUMBER = 3333;

// Create express app
const app = express();

app.use(express.json());
//use cores
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
// app.use(someMiddleware);
// Create a route to get support workers visits by id
app.get('/getSupportWorkerVisits', (req, res) => {
    try {
        const supportWorkerId = parseInt(req.query.supportWorkerId);
        if (isNaN(supportWorkerId)) {
            return res.status(400).json({ error: 'Invalid supportWorkerId' });
        }

        const supportWorker = supportWorkers().find(supportWorker => supportWorker.supportWorkerId === supportWorkerId);
        if (!supportWorker) {
            return res.status(404).json({ error: 'Support worker not found' });
        }

        const supportWorkerVisits = visits().filter(visit => visit.supportWorkerId === supportWorkerId);
        res.json(
            supportWorkerVisits
                .map(visit => {
                    return {
                        ...visit,
                        ...supportWorker
                    };
                })
                .sort((a, b) => a.startDateTime - b.startDateTime)
        );
    } catch (error) {
        console.error('Error fetching support worker visits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getWorkers', (req, res) => {
    try {
        res.json(supportWorkers());
    } catch (error) {
        console.error('Error fetching support workers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getVisits', (req, res) => {
    try {
        res.json(visits());
    } catch (error) {
        console.error('Error fetching visits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getWorkersAndVisits', (req, res) => {
    try {
        const workers = supportWorkers();
        const allVisits = visits();
        const workersAndVisits = workers.map(worker => {
            return {
                ...worker,
                visits: allVisits.filter(visit => visit.supportWorkerId === worker.supportWorkerId)
            };
        });
        res.json(workersAndVisits);
    } catch (error) {
        console.error('Error fetching workers and visits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT_NUMBER, () => {
    console.log(`Server started on http://localhost:${PORT_NUMBER}`);
});
