export interface IRepo <T> {
    readonly collectionName: string;
    get?(): T[];
    getById?(id: number): T;
    save?(T): T;
    delete?(id: number): T;
}
