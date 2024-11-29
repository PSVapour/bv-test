const API_URL = "http://localhost:3333";

import { SupportWorkerVisit } from '../types/SupportWorkerVisit.ts';
import { Worker } from '../types/Worker.ts';

export const getWorkersAndVisits = async (): Promise<Worker[]> => {
    try {
        const response: Response = await fetch(`${API_URL}/getWorkersAndVisits`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: Worker[] = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch workers and visits:', error);
        throw error;
    }
};




export const getSupportWorkerVisits = async (id: string): Promise<SupportWorkerVisit[]> => {
    if (!id) {
        throw new Error('Support worker ID is required');
    }

    try {
        const response: Response = await fetch(`${API_URL}/getSupportWorkerVisits?supportWorkerId=${encodeURIComponent(id)}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: SupportWorkerVisit[] = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch support worker visits:', error);
        throw error;
    }
};
