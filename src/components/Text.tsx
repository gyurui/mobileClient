import React from "react";
import { Text as ReactText, TextProps } from "react-native";

import { Colors } from "@theme/Colors";
import { Font } from "@theme/Font";

interface Props extends TextProps {
    fontWeight?: "bold" | "medium" | "light";
}

export class Text extends React.Component<Props> {
    private setFontFamily = (): string => {
        const { fontWeight } = this.props;

        switch (fontWeight) {
            case "bold":
                return Font.SofiaProBold;
            case "medium":
                return Font.SofiaProMedium;
            case "light":
                return Font.SofiaProLight;
            default:
                return Font.SofiaProRegular;
        }
    };

    public render(): React.ReactElement {
        const { style, ...otherProps } = this.props;

        return (
            <ReactText
                style={[
                    {
                        color: Colors.white,
                        fontFamily: this.setFontFamily(),
                        fontSize: 14,
                    },
                    style,
                ]}
                {...otherProps}
            >
                {this.props.children}
            </ReactText>
        );
    }
}
