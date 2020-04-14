export interface Environment {
    apiUrl: string;
    apiTimeout: number;

}

export class Env {
    private static readonly dev: Environment = {
        apiUrl: "http://192.168.0.14:8080",
        apiTimeout: 2 * 60 * 1000,
    };

    private static readonly prod: Environment = {
        apiUrl: "http://192.168.0.14:8080",
        apiTimeout: 2 * 60 * 1000,
    };

    // eslint-disable-next-line no-undef
    public static readonly get: Environment = __DEV__ ? Env.dev : Env.prod;
}
