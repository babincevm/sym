export interface IPaginationMeta {
    count: number;
}

export interface IPaginated<T = unknown> {
    data: T;
    meta?: IPaginationMeta;
}
