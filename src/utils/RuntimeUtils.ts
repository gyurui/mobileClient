import { Platform } from "react-native";
import * as _ from "lodash";

export class RuntimeUtils {
    public static isDevMode: boolean = _.get(process.env, "NODE_ENV") === "development";
    public static readonly isProdMode: boolean = _.get(process.env, "NODE_ENV") === "production";

    public static readonly isIOS: boolean = Platform.OS === "ios";
    public static readonly isAndroid: boolean = !RuntimeUtils.isIOS;
}
