import { Avatar, Box, Card, LinearProgress, Typography } from '@mui/material';

import { Worker } from '../types/Worker';

const calculateHoursWorked = (worker: Worker): number => {
    return worker.visits?.reduce((acc, visit): number => {
        const difference: number = new Date(visit.endDateTime).getTime() - new Date(visit.startDateTime).getTime();
        const hours: number = difference / 3600000;
        return acc + hours;
    }, 0) ?? 0;
};

interface WorkerCardProps {
    worker: Worker;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
    const hoursWorked: number = calculateHoursWorked(worker);
    const progress: number = (hoursWorked / worker.contractedHours) * 100;

    return (
        <Card sx={{ display: 'flex', 'flexGrow': 1, alignItems: 'center', p: 2, mb: 2, minWidth: '200px' }}>
            <Avatar
                alt={worker.name}
                src={worker.avatar}
                sx={{ width: 60, height: 60, mr: 2 }}
            />
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{worker.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {hoursWorked} / {worker.contractedHours} hours ({Math.round(progress)}%)
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        mt: 1,
                        height: 10,
                        borderRadius: 5,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: progress > 99 ? 'green' : progress > 75 ? 'orange' : 'red',
                        },
                    }}
                />
            </Box>
        </Card>
    );
};

export default WorkerCard;
