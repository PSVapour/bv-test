const express = require('express');
const db = require('./mockdata.js');

const PORT_NUMBER = 3333;

// Create express app
const app = express();

//use cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
 
// Create a simple API endpoint ‘getSupportWorkerVisits’ that returns a list of visits filtered by
// supportWorkerId and the response also includes the support worker assigned to them
// Handler to get visits for a support worker
const getSupportWorkerVisitsHandler = async (req, res) => {
    try {
        // Parse the supportWorkerId from the query parameters
        const supportWorkerId = parseInt(req.query.supportWorkerId);

        // Check if the supportWorkerId is a valid number
        if (isNaN(supportWorkerId)) {
            return res.status(400).json({ error: 'Invalid supportWorkerId' });
        }

        // simulate a database call that returns workers and visits, the callback function is used to simulate a database query
        const supportWorkerVisits = await db.someDatabaseQuery(({ workers, visits }) => {

            let supportWorker = workers.find(worker => worker.supportWorkerId === supportWorkerId);

            if (!supportWorker) {
                return null;
            }
            
            // filter and map the visits to include support worker details and sort them by startDateTime, 
            const supportWorkerVisits = [];
            for (const visit of visits) {
                if (visit.supportWorkerId === supportWorkerId) {
                    supportWorkerVisits.push({
                        ...visit,
                        ...supportWorker,
                        
                    });
                };
            };
            
            return supportWorkerVisits.sort((a, b) => a.startDateTime - b.startDateTime);
        });

        // If the support worker is not found, return a 404 error
        if (!supportWorkerVisits) {
            return res.status(404).json({ error: 'Support worker not found' });
        }

        res.json(supportWorkerVisits);
    } catch (error) {
        // Log the error and return a 500 internal server error
        console.error('Error fetching support worker visits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Use the handlers in the routes
app.get('/getSupportWorkerVisits', getSupportWorkerVisitsHandler);

// Start the server
app.listen(PORT_NUMBER, () => {
    console.log(`Server started on http://localhost:${PORT_NUMBER}`);
});


// THIS IS USED FOR THE UI TEST
// THIS IS USED FOR THE UI TEST
app.get('/getWorkersAndVisits', async (req, res) => {
    try {
        // simulate a database call that returns workers and visits, the callback function is used to simulate a database join
        const workersAndVisits = await db.someDatabaseQuery(({ workers, visits }) => {
            return workers.map(worker => {
                return {
                    ...worker,
                    visits: visits.filter(visit => visit.supportWorkerId === worker.supportWorkerId)
                };
            });
        });

        res.json(workersAndVisits);
    } catch (error) {
        console.error('Error fetching workers and visits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// THIS IS USED FOR THE UI TEST
// THIS IS USED FOR THE UI TEST


// Handler to get all support workers
const getWorkersHandler = (req, res) => {
    try {
        res.json(db.someDatabaseQuery(({ workers }) => workers));
    } catch (error) {
        console.error('Error fetching support workers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Handler to get all visits
const getVisitsHandler = (req, res) => {
    try {
        res.json(db.someDatabaseQuery(({ visits }) => visits));
    } catch (error) {
        console.error('Error fetching visits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
app.get('/getWorkers', getWorkersHandler);
app.get('/getVisits', getVisitsHandler);
