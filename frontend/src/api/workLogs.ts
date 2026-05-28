import type { CreateWorkLogDto, ReadManyWorkLogsDto } from '../types';
import { api } from './axios';

export const getWorkLogs = async (params?: {
    dateFrom?: string;
    dateTo?: string;
    pageNumber?: number;
    pageSize?: number;
}): Promise<ReadManyWorkLogsDto> => {
    const filteredParams = Object.fromEntries(
        Object.entries(params ?? {}).filter(([_, v]) => v !== '' && v !== undefined)
    )
    const { data } = await api.get('/work-logs', { params: filteredParams });
    return data;
};

export const createWorkLog = async (dto: CreateWorkLogDto): Promise<string> => {
    const { data } = await api.post('/work-logs', dto);
    return data;
};

export const updateWorkLog = async (id: string, dto: Partial<CreateWorkLogDto>): Promise<void> => {
    await api.put(`/work-logs/${id}`, dto);
}

export const deleteWorkLog = async (id: string): Promise<void> => {
    await api.delete(`/work-logs/${id}`);
}