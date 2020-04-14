import React from "react";
import { MainStack } from "@models/navigation/MainStack";
import { NavigationContainerRef } from "@react-navigation/native";

export type Routes = MainStack;
export type RouteNames = MainStack;

export class NavigationService {
    public static navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

    public static goBack(): void {
        if (this.navigationRef) {
            this.navigationRef.current?.goBack();
        }
    }

    public static resetNavigation(): void {
        if (this.navigationRef) {
            this.navigationRef.current?.reset({
                index: 0,
                routes: [{ name: MainStack.dashboard }],
            });
        }
    }

    public static navigate(routeName: RouteNames, screen: Routes, params?: object): void {
        if (this.navigationRef) {
            this.navigationRef.current?.navigate(routeName, { screen, params });
        }
    }
}
