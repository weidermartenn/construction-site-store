import type { ReadManyWorkTypesDto } from '../types';
import { api } from './axios';

export const getWorkTypes = async (): Promise<ReadManyWorkTypesDto> => {
    const { data } = await api.get('/work-types');
    return data;
};