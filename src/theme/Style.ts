import * as _ from "lodash";

/**
 * place common styles here to reduce code duplications
 */
export class Style {
    /**
     * set color opacity
     * @param color string
     * @param opacity number 0.0 - 1.0
     */
    public static setOpacity(color: string, opacity = 0.5) {
        return color + _.padStart(Math.round(255 * opacity).toString(16), 2, "0");
    }
}
