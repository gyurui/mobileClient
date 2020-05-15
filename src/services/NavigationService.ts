import React from "react";
import { MainStack } from "@models/navigation/MainStack";
import { NavigationContainerRef } from "@react-navigation/native";

export type Routes = MainStack;
export type RouteNames = MainStack;

export class NavigationService {
    public static navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

    public static navigateToLogin(params?: object): void {
        NavigationService.navigate(MainStack.login, MainStack.login, params);
    }

    public static navigateToSensor(params?: object): void {
        NavigationService.navigate(MainStack.sensor, MainStack.sensor, params);
    }

    public static goBack(): void {
        if (this.navigationRef) {
            this.navigationRef.current?.goBack();
        }
    }

    public static resetNavigation(): void {
        if (this.navigationRef) {
            this.navigationRef.current?.reset({
                index: 0,
                routes: [{ name: MainStack.login }],
            });
        }
    }
    //
    // public static navigate(routeName: MainStack, params?: object): void {
    //     if (this.navigationRef) {
    //         this.navigationRef?.current?.dispatch(NavigationActions.navigate({ routeName, params }));
    //     } else {
    //         console.error("NavigationService navigatorRef is missing");
    //     }
    // }

    public static navigate(routeName: RouteNames, screen: Routes, params?: object): void {
        if (this.navigationRef) {
            this.navigationRef.current?.navigate(routeName, { screen, params });
        } else {
            console.debug("NavigationService navigatorRef is missing");
        }
    }
}
