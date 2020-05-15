import React from "react";
import { View, StyleSheet, SafeAreaView, TextInput, StatusBar, TouchableOpacity, ViewStyle } from "react-native";
import { Font } from "@theme/Font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "@theme/Colors";
import { ViewUtils } from "@utils/ViewUtils";
import { Text } from "@components/Text";
import { NavigationProps } from "@models/app/NavigationProps";
import { Button } from "@components/Button";
import { accelerometer, gyroscope, barometer, magnetometer } from "react-native-sensors";
import { Subscription } from "rxjs";
import { ApiService } from "@services/ApiServices";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory-native";
import { getBatteryLevel } from "react-native-device-info";
import { SensorChartWithThreeLine } from "@screens/StartMeasurement/components/SensorChartWithThreeLine";

type Props = NavigationProps<void>;

interface State {
    samplingRate: string;
    modalVisible: boolean;
    sentData: Measurement[];
    timer: boolean;
    sensorCellItems: SensorCellItem[];
    info: string;
}

interface Measurement {
    accelerometerX?: number;
    accelerometerY?: number;
    accelerometerZ?: number;
    gyroscopeX?: number;
    gyroscopeY?: number;
    gyroscopeZ?: number;
    magnetometerX?: number;
    magnetometerY?: number;
    magnetometerZ?: number;
    pressure?: number;
    batteryLevel?: number;
    sendDate: Date;
}

interface SensorCellItem {
    id: number;
    name: SensorType;
    isSelect: boolean;
    selectedClass: ViewStyle;
    isAvailable: boolean;
}

enum SensorType {
    accelerometer = "accelerometer",
    gyroscope = "gyroscope",
    barometer = "barometer",
    magnetometer = "magnetometer",
    batteryLevel = "batteryLevel",
    speed = "speed",
    pidSignal = "pidSignal",
}

export class StartMeasurementScreen extends React.PureComponent<Props> {
    private passwordInput?: TextInput;

    private accelerometerX = 0;
    private accelerometerY = 0;
    private accelerometerZ = 0;

    private gyroscopeX = 0;
    private gyroscopeY = 0;
    private gyroscopeZ = 0;

    private magnetometerX = 0;
    private magnetometerY = 0;
    private magnetometerZ = 0;

    private pressure = 0;

    private batteryLevel = 0;

    private subscription: Subscription | null = null;
    private timer: any;

    private whiteStyle = {
        axis: { stroke: "white" },
        axisLabel: { fontSize: 20, padding: 30, fill: "white" },
        ticks: { stroke: "white", size: 5 },
        tickLabels: { fontSize: 15, padding: 5, fill: "white" },
    };

    public state: State = {
        samplingRate: "1",
        modalVisible: true,
        sentData: [],
        timer: false,
        info: "",
        sensorCellItems: [
            {
                id: 1,
                name: SensorType.accelerometer,
                isSelect: false,
                selectedClass: styles.list,
                isAvailable: true,
            },
            {
                id: 2,
                name: SensorType.gyroscope,
                isSelect: false,
                selectedClass: styles.list,
                isAvailable: true,
            },
            {
                id: 3,
                name: SensorType.magnetometer,
                isSelect: false,
                selectedClass: styles.list,
                isAvailable: true,
            },
            {
                id: 4,
                name: SensorType.barometer,
                isSelect: false,
                selectedClass: styles.list,
                isAvailable: true,
            },
            {
                id: 5,
                name: SensorType.batteryLevel,
                isSelect: false,
                selectedClass: styles.list,
                isAvailable: true,
            },
            {
                id: 6,
                name: SensorType.speed,
                isSelect: false,
                selectedClass: styles.list,
                isAvailable: true,
            },
            {
                id: 7,
                name: SensorType.pidSignal,
                isSelect: false,
                selectedClass: styles.list,
                isAvailable: true,
            },
        ],
    };

    public componentDidMount(): void {
        let infoText = this.state.info;
        this.subscription = accelerometer.subscribe(
            ({ x, y, z }) => {
                this.accelerometerX = x;
                this.accelerometerY = y;
                this.accelerometerZ = z;
            },
            (error) => {
                console.log(error);
                infoText = "Accelerometer is not available. ";

                const index = this.state.sensorCellItems.findIndex((sensorType) => SensorType.accelerometer === sensorType.name);

                const sensorCellItems = [...this.state.sensorCellItems];
                const item = {
                    ...sensorCellItems[index],
                };
                item.isAvailable = false;
                sensorCellItems[index] = item;

                this.setState({ info: infoText, sensorCellItems });
            },
        );

        this.subscription = gyroscope.subscribe(
            ({ x, y, z }) => {
                this.gyroscopeX = x;
                this.gyroscopeY = y;
                this.gyroscopeZ = z;
            },
            (error) => {
                console.log(error);
                infoText = this.state.info + "Gyroscope is not available. ";
                this.setState({ info: infoText });

                const index = this.state.sensorCellItems.findIndex((sensorType) => SensorType.gyroscope === sensorType.name);

                const sensorCellItems = [...this.state.sensorCellItems];
                const item = {
                    ...sensorCellItems[index],
                };
                item.isAvailable = false;
                sensorCellItems[index] = item;

                this.setState({ info: infoText, sensorCellItems });
            },
        );

        this.subscription = magnetometer.subscribe(
            ({ x, y, z }) => {
                this.magnetometerX = x;
                this.magnetometerY = y;
                this.magnetometerZ = z;
            },
            (error) => {
                console.log(error);
                infoText = this.state.info + "Magnetometer is not available. ";
                const index = this.state.sensorCellItems.findIndex((sensorType) => SensorType.magnetometer === sensorType.name);

                const sensorCellItems = [...this.state.sensorCellItems];
                const item = {
                    ...sensorCellItems[index],
                };
                item.isAvailable = false;
                sensorCellItems[index] = item;

                this.setState({ info: infoText, sensorCellItems });
            },
        );

        this.subscription = barometer.subscribe(
            ({ pressure }) => {
                this.pressure = pressure;
            },
            (error) => {
                console.log(error);
                infoText = this.state.info + "Barometer unfortunately is not available. ";
                const index = this.state.sensorCellItems.findIndex((sensorType) => SensorType.barometer === sensorType.name);

                const sensorCellItems = [...this.state.sensorCellItems];
                const item = {
                    ...sensorCellItems[index],
                };
                item.isAvailable = false;
                sensorCellItems[index] = item;

                this.setState({ info: infoText, sensorCellItems });
            },
        );

        getBatteryLevel().then((value) => {
            this.batteryLevel = value;
        });
    }

    private selectItem = (item: SensorCellItem) => {
        item.isSelect = !item.isSelect;
        item.selectedClass = item.isSelect ? styles.selected : styles.list;

        const index = this.state.sensorCellItems.findIndex((sensorType) => item.id === sensorType.id);

        const sensorTypes = [...this.state.sensorCellItems];
        sensorTypes[index] = item;

        this.setState({
            sensorTypes,
        });
    };

    public componentWillUnmount(): void {
        this.subscription?.unsubscribe();
    }

    private uploadMethod = () => {
        getBatteryLevel().then((value) => {
            this.batteryLevel = value;
        });

        let measurement = {
            sendDate: new Date(),
        };

        if (this.state.sensorCellItems.find((item) => item.name === SensorType.accelerometer)?.isSelect) {
            const newMeasurement = {
                ...measurement,
                accelerometerX: this.accelerometerX,
                accelerometerY: this.accelerometerY,
                accelerometerZ: this.accelerometerZ,
            };
            measurement = newMeasurement;
        }

        if (this.state.sensorCellItems.find((item) => item.name === SensorType.gyroscope)?.isSelect) {
            const newMeasurement = {
                ...measurement,
                gyroscopeX: this.gyroscopeX,
                gyroscopeY: this.gyroscopeY,
                gyroscopeZ: this.gyroscopeZ,
            };
            measurement = newMeasurement;
        }

        if (this.state.sensorCellItems.find((item) => item.name === SensorType.magnetometer)?.isSelect) {
            const newMeasurement = {
                ...measurement,
                magnetometerX: this.magnetometerX,
                magnetometerY: this.magnetometerY,
                magnetometerZ: this.magnetometerZ,
            };
            measurement = newMeasurement;
        }

        if (this.state.sensorCellItems.find((item) => item.name === SensorType.barometer)?.isSelect) {
            const newMeasurement = {
                ...measurement,
                pressure: this.pressure,
            };
            measurement = newMeasurement;
        }

        const sent = this.state.sentData;
        if (sent.length > 30) {
            sent.shift();
        }
        this.setState({
            sentData: [...sent, measurement],
        });
        ApiService.sendMeasurementData(measurement);
    };

    private startMeasurement = () => {
        this.timer = setInterval(this.uploadMethod, Number(this.state.samplingRate) * 1000);
        this.setState({
            timer: true,
        });
    };

    private stopMeasurement = () => {
        if (this.timer) {
            this.setState({
                timer: false,
            });
            clearInterval(this.timer);
        }
    };

    private renderBatteryLevel() {
        return (
            <>
                <Text style={{ fontSize: 24, marginTop: 20 }}>{"Battery level"}</Text>
                <VictoryChart>
                    <VictoryAxis label="Time [s]" style={this.whiteStyle} />
                    <VictoryAxis dependentAxis label="Battery level" style={this.whiteStyle} />
                    <VictoryLine
                        data={this.state.sentData.map((value) => {
                            return value.batteryLevel;
                        })}
                        style={{
                            data: {
                                stroke: Colors.white,
                            },
                            parent: {
                                border: `1px solid ${Colors.white}`,
                            },
                        }}
                    />
                </VictoryChart>
            </>
        );
    }

    private renderSensorCharts() {
        return (
            <>
                {this.state.sensorCellItems.find((item) => item.name === SensorType.accelerometer)?.isSelect && (
                    <SensorChartWithThreeLine
                        title={"Accelerometer values"}
                        xLabelTitle={"Time [s]"}
                        yLabelTitle={"Acceleration [g]"}
                        x={this.state.sentData.map((value) => {
                            return value.accelerometerX;
                        })}
                        y={this.state.sentData.map((value) => {
                            return value.accelerometerY;
                        })}
                        z={this.state.sentData.map((value) => {
                            return value.accelerometerZ;
                        })}
                    />
                )}
                {this.state.sensorCellItems.find((item) => item.name === SensorType.gyroscope)?.isSelect && (
                    <SensorChartWithThreeLine
                        title={"Gyroscope values"}
                        xLabelTitle={"Time [s]"}
                        yLabelTitle={"Gyroscope [g]"}
                        x={this.state.sentData.map((value) => {
                            return value.gyroscopeX;
                        })}
                        y={this.state.sentData.map((value) => {
                            return value.gyroscopeY;
                        })}
                        z={this.state.sentData.map((value) => {
                            return value.gyroscopeZ;
                        })}
                    />
                )}
                {this.state.sensorCellItems.find((item) => item.name === SensorType.magnetometer)?.isSelect && (
                    <SensorChartWithThreeLine
                        title={"Magnetometer values"}
                        xLabelTitle={"Time [s]"}
                        yLabelTitle={"Magnetometer [g]"}
                        x={this.state.sentData.map((value) => {
                            return value.magnetometerX;
                        })}
                        y={this.state.sentData.map((value) => {
                            return value.magnetometerY;
                        })}
                        z={this.state.sentData.map((value) => {
                            return value.magnetometerZ;
                        })}
                    />
                )}
                {this.state.sensorCellItems.find((item) => item.name === SensorType.batteryLevel)?.isSelect && this.renderBatteryLevel()}
            </>
        );
    }

    public render(): React.ReactNode {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={"light-content"} backgroundColor={Colors.tuna} />
                <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
                    <View style={styles.innerContainer}>
                        <View style={styles.middleContainer}>
                            {this.state.timer ? (
                                <>
                                    <Text fontWeight={"bold"} style={{ fontSize: 26 }}>
                                        {"Measurement"}
                                    </Text>
                                    <Button style={styles.login} title={"Stop"} onPress={this.stopMeasurement} />
                                    {this.renderSensorCharts()}
                                    {/*<Text fontWeight={"bold"} style={{ fontSize: 11 }}>*/}
                                    {/*    {JSON.stringify(this.state.sentData)}*/}
                                    {/*</Text>*/}
                                </>
                            ) : (
                                <>
                                    <View style={{ margin: 20, padding: 20, borderColor: Colors.white, borderWidth: 1 }}>
                                        <Text fontWeight={"bold"} style={{ fontSize: 26, margin: 10 }}>
                                            {"Info"}
                                        </Text>
                                        <Text style={{}}>{this.state.info}</Text>
                                    </View>
                                    <View style={{ margin: 20, padding: 20, borderColor: Colors.white, borderWidth: 1 }}>
                                        <Text fontWeight={"bold"} style={{ fontSize: 26 }}>
                                            {"Choose sampling rate in sec"}
                                        </Text>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={"number in sec"}
                                                placeholderTextColor={Colors.midGray}
                                                value={this.state.samplingRate}
                                                keyboardType={"numeric"}
                                                onChangeText={(value: string): void => this.setState({ samplingRate: value })}
                                                onSubmitEditing={(): void => {
                                                    if (this.passwordInput) {
                                                        this.passwordInput.focus();
                                                    }
                                                }}
                                            />
                                            <Text fontWeight={"bold"} style={{ fontSize: 26 }}>
                                                {"sec"}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ margin: 20, padding: 20, borderColor: Colors.white, borderWidth: 1 }}>
                                        <Text fontWeight={"bold"} style={{ fontSize: 26, margin: 10 }}>
                                            {"Choose sensors to upload"}
                                        </Text>
                                        {this.state.sensorCellItems.map((item: SensorCellItem) => {
                                            return (
                                                <TouchableOpacity key={item.id} disabled={!item.isAvailable} style={[styles.list, item.selectedClass, !item.isAvailable && {backgroundColor: Colors.midGray}]} onPress={() => this.selectItem(item)}>
                                                    <Text style={{}}>{item.name}</Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                    <Button style={styles.login} title={"Start"} onPress={this.startMeasurement} />
                                </>
                            )}
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tuna,
    },
    keyboardAware: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1,
        marginVertical: 30,
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
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    input: {
        width: 258,
        textAlign: "center",
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
        color: Colors.white,
        fontSize: 26,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    modalText: {
        fontFamily: Font.SofiaProRegular,
        marginBottom: 15,
        textAlign: "center",
    },
    list: {
        width: 300,
        height: 40,
        paddingVertical: 5,
        margin: 5,
        flexDirection: "row",
        backgroundColor: "#192338",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    lightText: {
        color: "#f7f7f7",
        width: 200,
        paddingLeft: 15,
        fontSize: 12,
    },
    selected: { backgroundColor: Colors.lima },
});
