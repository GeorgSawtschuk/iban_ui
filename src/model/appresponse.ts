

export type AppResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};