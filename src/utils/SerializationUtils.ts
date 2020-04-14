import * as util from "util";

export class SerializationUtils {
    // tslint:disable-next-line:no-any
    public static safeStringify(object: any): string {
        try {
            return JSON.stringify(object);
        } catch (e) {
            return JSON.stringify(util.inspect(object));
        }
    }
}
