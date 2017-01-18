export interface IConfig {
    mongodb: {
        username: string;
        password: string;
        host: string;
        port: number;
        databaseName: string;
    };
    server: {};
}
