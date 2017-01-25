export interface IRepo <T> {
    readonly collectionName: string;
    get?(): Promise<T[]>;
    getById?(id: number): Promise<T>;
    save?(T): Promise<T>;
    delete?(id: number): Promise<T>;
}
