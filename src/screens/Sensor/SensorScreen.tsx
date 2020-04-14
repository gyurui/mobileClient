import React, { Component, ReactNode } from "react";
import { StyleSheet, View, BackHandler, PixelRatio, Dimensions, Text, StatusBar, SafeAreaView } from "react-native";
import { Subscription } from "rxjs";
import { gyroscope } from "react-native-sensors";
import { Colors } from "@theme/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ViewUtils } from "@utils/ViewUtils";
import { Font } from "@theme/Font";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import { ApiService } from "@services/ApiServices";

interface State {
    image: string;
    subscription?: Subscription;
    x: number;
    y: number;
    z: number;
    time: number;
    dataX: PlotData[];
    dataY: PlotData[];
    dataZ: PlotData[];
}

const window = Dimensions.get("window");

const deviceWidth = window.width;
const deviceHeight = window.height;

const imageWidth = 3 * deviceWidth;
const imageHeight = deviceHeight;

export class SensorScreen extends Component<{}, State> {
    public state: State = {
        image: `https://placeimg.com/${PixelRatio.getPixelSizeForLayoutSize(imageWidth)}/${PixelRatio.getPixelSizeForLayoutSize(imageHeight)}/any`,
        x: 0,
        y: 0,
        z: 0,
        dataX: [],
        dataY: [],
        dataZ: [],
        time: 0,
    };

    private x = 0;
    private y = 0;
    private z = 0;

    public componentDidMount() {
        ApiService.init();
        const subscription = gyroscope.subscribe(({ x, y, z }) => {
            this.x = this.x + x;
            this.y = this.y + y;
            this.z = this.z + z;
        });

        this.setState({ subscription }, () => {
            this.plotData();
        });
    }

    public componentWillUnmount() {
        this.state.subscription?.unsubscribe();
    }

    private async plotData() {
        this.setState(
            (state) => {
                const plotDataX = state.dataX;
                if (plotDataX.length > 30) {
                    plotDataX.shift();
                }
                plotDataX.push({ x: state.time + 1, y: this.x });

                ApiService.sendData(plotDataX);

                const plotDataY = state.dataY;
                if (plotDataY.length > 30) {
                    plotDataY.shift();
                }
                plotDataY.push({ x: state.time + 1, y: this.y });

                const plotDataZ = state.dataZ;
                if (plotDataZ.length > 30) {
                    plotDataZ.shift();
                }
                plotDataZ.push({ x: state.time + 1, y: this.z });
                return {
                    dataX: plotDataX,
                    dataY: plotDataY,
                    dataZ: plotDataZ,
                    time: state.time + 1,
                };
            },
            () => {
                setTimeout(() => {
                    this.plotData();
                }, 2000);
            },
        );
    }

    private static onBackPress = (): boolean => {
        BackHandler.exitApp();
        return true;
    };

    public render(): ReactNode {
        const positionOnScreenX = -imageWidth / 2;
        // The y axis of the sensor data resembles what we need for the x axis
        // in the image
        const movementX = (-this.state.y / 1000) * imageWidth;

        return (
            <SafeAreaView style={styles.container}>
                {/*<View style={styles.container}>*/}
                {/*    <Image*/}
                {/*        style={[*/}
                {/*            styles.image,*/}
                {/*            {*/}
                {/*                transform: [*/}
                {/*                    {*/}
                {/*                        translateX: positionOnScreenX + movementX,*/}
                {/*                    },*/}
                {/*                ],*/}
                {/*            },*/}
                {/*        ]}*/}
                {/*        source={{ uri: this.state.image }}*/}
                {/*    />*/}
                {/*</View>*/}
                <StatusBar barStyle={"light-content"} backgroundColor={Colors.tuna} />
                <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
                    <View style={styles.innerContainer}>
                        <View style={styles.titleContainer}>
                            <View>
                                <Text style={styles.doorText}>{"X axis graph"}</Text>
                            </View>
                        </View>
                        <VictoryChart>
                            <VictoryLine
                                data={this.state.dataX}
                                style={{
                                    data: {
                                        stroke: Colors.tuna,
                                    },
                                    parent: {
                                        border: `1px solid ${Colors.white}`,
                                    },
                                }}
                            />
                        </VictoryChart>
                        <View style={styles.titleContainer}>
                            <View>
                                <Text style={styles.doorText}>{"Y axis graph"}</Text>
                            </View>
                        </View>
                        <VictoryChart>
                            <VictoryLine
                                data={this.state.dataY}
                                style={{
                                    data: {
                                        stroke: Colors.tuna,
                                    },
                                    parent: {
                                        border: `1px solid ${Colors.white}`,
                                    },
                                }}
                            />
                        </VictoryChart>
                        <View style={styles.titleContainer}>
                            <View>
                                <Text style={styles.doorText}>{"Z axis graph"}</Text>
                            </View>
                        </View>
                        <VictoryChart>
                            <VictoryLine
                                data={this.state.dataZ}
                                style={{
                                    data: {
                                        stroke: Colors.tuna,
                                    },
                                    parent: {
                                        border: `1px solid ${Colors.white}`,
                                    },
                                }}
                            />
                        </VictoryChart>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        position: "absolute",
        top: 0,
        left: 0,
        height: imageHeight,
        width: imageWidth,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    keyboardAware: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1,
        paddingBottom: 30,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        marginTop: 40,
        height: ViewUtils.getHeight() / 5,
        width: (ViewUtils.getHeight() / 5) * 0.9,
    },
    middleContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    input: {
        width: 258,
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
        color: Colors.white,
        fontSize: 18,
        fontFamily: Font.SofiaProRegular,
        paddingBottom: 6,
        paddingHorizontal: 0,
        paddingTop: 8,
        marginTop: 20,
    },
    login: {
        width: 190,
        marginTop: 20,
    },
    text: {
        fontFamily: Font.SofiaProRegular,
        color: Colors.white,
    },
    googleLogin: {
        width: 190,
        marginTop: 20,
        backgroundColor: Colors.white,
    },
    googleLoginInner: {
        color: Colors.midGray,
    },
    forgotPassword: {
        width: 190,
        marginTop: 25,
        backgroundColor: Colors.tuna,
        borderWidth: 1,
        borderColor: Colors.midGray,
    },
    forgotPasswordInner: {
        color: Colors.midGray,
    },
    versionContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    version: {
        fontFamily: Font.SofiaProRegular,
        color: Colors.midGray,
        alignSelf: "center",
    },
    titleContainer: {
        borderBottomColor: Colors.midGray,
        borderBottomWidth: 1,
    },
    doorText: {
        fontSize: 20,
        lineHeight: 27,
        color: Colors.tuna,
        fontFamily: Font.SofiaProRegular,
        marginBottom: 10.5,
    },
});
