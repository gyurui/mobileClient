import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Router } from "./Router";
import { NavigationService } from "@services/NavigationService";
import { SafeAreaProvider } from "react-native-safe-area-context";

export class App extends React.Component<{}, {}> {
    public async componentDidMount(): Promise<void> {}

    public render(): React.ReactNode {
        return (
            <SafeAreaProvider>
                <NavigationContainer ref={NavigationService.navigationRef}>
                    <Router.mainStackNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        );
    }
}
