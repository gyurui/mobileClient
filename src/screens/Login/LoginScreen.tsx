import React from "react";
import { View, StyleSheet, SafeAreaView, TextInput, StatusBar, Image, Modal, Alert, Text } from "react-native";
import { Font } from "@theme/Font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@components/Button";
import { Colors } from "@theme/Colors";
import { ViewUtils } from "@utils/ViewUtils";
import { NavigationProps } from "@models/app/NavigationProps";
import { Env } from "@utils/Env";
import { MainStack } from "@models/navigation/MainStack";
import { ApiService } from "@services/ApiServices";

type Props = NavigationProps<void>;

interface State {
    serverAddress: string;
    modalVisible: boolean;
}
export class LoginScreen extends React.PureComponent<Props> {
    private passwordInput?: TextInput;

    public state: State = {
        serverAddress: Env.get.apiUrl,
        modalVisible: false,
    };

    public componentDidMount(): void {}

    private readonly onLoginButtonPress = async () => {
        try {
            await ApiService.init(this.state.serverAddress);
            const isServerRunning = await ApiService.getServeState();
            if (isServerRunning) {
                this.props.navigation.navigate(MainStack.start);
            } else {
                this.setModalVisible();
            }
        } catch (e) {
            this.setModalVisible();
        }
    };

    private setModalVisible = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    public render(): React.ReactNode {
        const { modalVisible } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={"light-content"} backgroundColor={Colors.tuna} />
                <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
                    <View style={styles.innerContainer}>
                        <Image style={styles.logo} resizeMethod={"scale"} resizeMode={"contain"} source={require("@assets/images/logo.png")} />
                        <View style={styles.middleContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Server address"}
                                placeholderTextColor={Colors.midGray}
                                value={this.state.serverAddress}
                                onChangeText={(value: string): void => this.setState({ serverAddress: value })}
                                onSubmitEditing={(): void => {
                                    if (this.passwordInput) {
                                        this.passwordInput.focus();
                                    }
                                }}
                            />
                            <Button style={styles.login} title={"Connect"} onPress={this.onLoginButtonPress} />
                        </View>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>{"The server isn't running"}</Text>
                                    <Button style={styles.login} title={"Hide Modal"} onPress={this.setModalVisible} />
                                </View>
                            </View>
                        </Modal>
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
        flex: 1,
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
});
