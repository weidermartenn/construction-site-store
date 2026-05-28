export interface WorkType {
    id: string;
    name: string;
    unit: string;
}

export interface WorkLog {
    id: string;
    date: string;
    workTypeId: string;
    volume: number;
    executor: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReadManyWorkLogsDto {
    count: number;
    data: WorkLog[];
}

export interface ReadManyWorkTypesDto {
    count: number;
    data: WorkType[];
}

export interface CreateWorkLogDto {
    date: string;
    workTypeId: string;
    volume: number;
    executor: string;
}