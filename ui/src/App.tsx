import './App.css'

import { useEffect, useState } from 'react';

import { Worker } from './types/Worker.ts';
import WorkerList from './components/WorkerList.tsx';
import {
  getWorkersAndVisits
} from './services/supportWorkers.ts';

function App() {
  const [workersAndVisits, setWorkersAndVisits] = useState<Worker[]>([]);

  useEffect(() => {
    // Replace with your data fetching logic
    const fetchData = async () => {
      try {
        const response: Worker[] = await getWorkersAndVisits();
        setWorkersAndVisits(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <WorkerList supportWorkers={workersAndVisits} />
    </>
  );
}

export default App;
