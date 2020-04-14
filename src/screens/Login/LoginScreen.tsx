import React from "react";
import { View, StyleSheet, SafeAreaView, TextInput, StatusBar } from "react-native";
import { Font } from "@theme/Font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@components/Button";
import { Colors } from "@theme/Colors";
import { Text } from "@components/Text";
import { ViewUtils } from "@utils/ViewUtils";
import { NavigationProps } from "@models/app/NavigationProps";

type Props = NavigationProps<void>;

interface State {
    password: string;
    email: string;
}
export class LoginScreen extends React.PureComponent<Props> {
    private passwordInput?: TextInput;

    public state: State = {
        email: "",
        password: "",
    };

    public componentDidMount(): void {}

    private readonly onGoogleLoginButtonPress = async () => {};

    private readonly onLoginButtonPress = async () => {};

    public render(): React.ReactNode {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={"light-content"} backgroundColor={Colors.tuna} />
                <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
                    <View style={styles.innerContainer}>
                        <View style={styles.logo} />
                        <View style={styles.middleContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={"email"}
                                placeholderTextColor={Colors.midGray}
                                value={this.state.email}
                                keyboardType={"email-address"}
                                returnKeyType={"next"}
                                onChangeText={(value: string): void => this.setState({ email: value })}
                                onSubmitEditing={(): void => {
                                    if (this.passwordInput) {
                                        this.passwordInput.focus();
                                    }
                                }}
                            />
                            <TextInput
                                ref={(input: TextInput | null): void => {
                                    this.passwordInput = input || undefined;
                                }}
                                style={styles.input}
                                placeholder={"password"}
                                placeholderTextColor={Colors.midGray}
                                value={this.state.password}
                                returnKeyType={"done"}
                                secureTextEntry={true}
                                onChangeText={(value: string): void => this.setState({ password: value })}
                                onSubmitEditing={this.onLoginButtonPress}
                            />
                            <Button style={styles.login} title={"login"} onPress={this.onLoginButtonPress} />
                            <Button style={styles.googleLogin} innerStyle={styles.googleLoginInner} title={"loginWithGoogle"} onPress={this.onGoogleLoginButtonPress} />
                            <Button style={styles.forgotPassword} innerStyle={styles.forgotPasswordInner} title={"forgotPassword"} onPress={this.onLoginButtonPress} />
                        </View>
                        <View style={styles.versionContainer}>
                            <Text style={styles.version}>{" V "}</Text>
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
});
