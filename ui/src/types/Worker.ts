import { Visit } from './Visit';

export type Worker = {
    supportWorkerId: number;
    name: string;
    avatar: string;
    hoursWorked: number;
    contractedHours: number;
    visits?: Visit[]
}
