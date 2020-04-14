import { Dimensions } from "react-native";

export class ViewUtils {
    public static getHeight(): number {
        return Dimensions.get("window").height;
    }

    public static getWidth(): number {
        return Dimensions.get("window").width;
    }

    public static getAspectRation(): number {
        return this.getWidth() / this.getHeight();
    }
}
