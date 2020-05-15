import React from "react";
import { isIphoneX } from "react-native-iphone-x-helper";
import { concernSESize, isIphoneSE } from "react-native-iphone-se-helper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import { MainStack } from "@models/navigation/MainStack";
import { Colors } from "@theme/Colors";
import { LoginScreen } from "@screens/Login/LoginScreen";
import { StyleSheet } from "react-native";
import { SensorScreen } from "@screens/Sensor/SensorScreen";
import { Font } from "@theme/Font";
import { StartMeasurementScreen } from "@screens/StartMeasurement/StartMeasurementScreen";

export interface MainStackParamList extends ParamListBase {
    login: undefined;
    sensor: undefined;
    start: undefined;
}

export class Router {
    private static readonly mainStack = createDrawerNavigator<MainStackParamList>();

    public static readonly mainStackNavigator = () => {
        return (
            <Router.mainStack.Navigator
                initialRouteName={MainStack.login}
                drawerStyle={drawerStyles.drawerStyle}
                drawerPosition={"right"}
                drawerContentOptions={{
                    activeTintColor: Colors.tuna,
                    activeBackgroundColor: "transparent",
                    labelStyle: drawerStyles.drawerLabelStyle,
                }}
            >
                <Router.mainStack.Screen name={MainStack.login} component={LoginScreen} />
                <Router.mainStack.Screen name={MainStack.sensor} component={SensorScreen} />
                <Router.mainStack.Screen name={MainStack.start} component={StartMeasurementScreen} />
            </Router.mainStack.Navigator>
        );
    };
}

export const drawerStyles = StyleSheet.create({
    drawerStyle: {
        width: "74.5%",
        backgroundColor: Colors.wildSand,
        marginTop: isIphoneX() ? 35 : 0,
    },
    drawerLabelStyle: {
        fontFamily: Font.SofiaProMedium,
        color: Colors.tuna,
        fontSize: concernSESize(18, 14),
        marginLeft: isIphoneSE() ? -20 : -10,
    },
});
