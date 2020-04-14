import React from "react";
import { ButtonProps, StyleProp, StyleSheet, TextStyle, TouchableHighlight, View, ViewStyle } from "react-native";
import { Text } from "./Text";
import { Colors } from "@theme/Colors";
import { Style } from "@theme/Style";

interface Props {
    disabled?: boolean;
    iconRight?: boolean;
    innerStyle?: StyleProp<TextStyle>;
    renderIcon?: React.ReactChild;
    style?: StyleProp<ViewStyle>;
}

export class Button extends React.PureComponent<Props & ButtonProps> {
    private renderButtonInner = (props: Props): React.ReactElement => {
        const { iconRight, innerStyle, renderIcon } = props;

        if (renderIcon) {
            if (iconRight) {
                return (
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[styles.label, innerStyle]}>{this.props.title}</Text>

                        <View style={styles.iconWrapperRight}>{renderIcon}</View>
                    </View>
                );
            }

            return (
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.iconWrapperLeft}>{renderIcon}</View>

                    <Text style={[styles.label, innerStyle]}>{this.props.title}</Text>
                </View>
            );
        }

        return <Text style={[styles.label, innerStyle]}>{this.props.title}</Text>;
    };

    private renderButton = (props: Props): React.ReactElement => {
        const { disabled, style, ...otherProps } = props;

        return (
            <TouchableHighlight
                style={[styles.primary, disabled && { backgroundColor: Style.setOpacity(Colors.midGray, 0.5) }, style]}
                disabled={disabled}
                underlayColor={Colors.ghost}
                {...otherProps}
            >
                {this.renderButtonInner(props)}
            </TouchableHighlight>
        );
    };

    public render(): React.ReactElement {
        return this.renderButton(this.props);
    }
}

const styles = StyleSheet.create({
    primary: {
        alignItems: "center",
        backgroundColor: Colors.lima,
        borderRadius: 40 / 2,
        height: 40,
        justifyContent: "center",
    },
    label: {
        color: Colors.white,
    },
    iconWrapperLeft: {
        paddingRight: 10,
    },
    iconWrapperRight: {
        paddingLeft: 10,
    },
});
