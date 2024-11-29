import { Grid2 as Grid } from '@mui/material';
import { Worker } from '../types/Worker.ts';
import WorkerCard from './WorkerCard';
// Main List of Support Workers
interface WorkerListProps {
    supportWorkers: Worker[];
}

const WorkerList: React.FC<WorkerListProps> = ({ supportWorkers }) => {
    return (
        <Grid
            container
            spacing={4}
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                width: '100%',
            }}
        >
            {supportWorkers.map((worker) => (
                <WorkerCard worker={worker} key={worker.supportWorkerId} />
            ))}
        </Grid>
    );
};

export default WorkerList;
