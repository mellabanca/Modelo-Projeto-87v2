import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TextInput
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

import firebase from "firebase";

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: "image_1",
            dropdownHeight: 40,
            light_theme: true
        };
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser = () => {
        let theme;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", (snapshot) => {
                theme = snapshot.val().current_theme
                this.setState({ light_theme: theme === "light" })
            })
    }

    render() {
        let preview_images = {
            image_1: require("../assets/image_1.jpg"),
            image_2: require("../assets/image_2.jpg"),
            image_3: require("../assets/image_3.jpg"),
            image_4: require("../assets/image_4.jpg"),
            image_5: require("../assets/image_5.jpg"),
            image_6: require("../assets/image_6.jpg"),
            image_7: require("../assets/image_7.jpg")
        };
        return (
            <View style={this.state.light_theme ? styles.containerLight : styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={styles.iconImage}
                        ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Novo Post</Text>
                    </View>
                </View>
                <View style={styles.fieldsContainer}>
                    <ScrollView>
                        <Image
                            source={preview_images[this.state.previewImage]}
                            style={styles.previewImage}
                        ></Image>
                        <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                            <DropDownPicker
                                items={[
                                    { label: "Imagem 1", value: "image_1" },
                                    { label: "Imagem 2", value: "image_2" },
                                    { label: "Imagem 3", value: "image_3" },
                                    { label: "Imagem 4", value: "image_4" },
                                    { label: "Imagem 5", value: "image_5" },
                                    { label: "Imagem 6", value: "image_6" },
                                    { label: "Imagem 7", value: "image_7" }
                                ]}
                                defaultValue={this.state.previewImage}
                                containerStyle={{
                                    height: 40,
                                    borderRadius: 20,
                                    marginBottom: 10
                                }}
                                onOpen={() => {
                                    this.setState({ dropdownHeight: 170 });
                                }}
                                onClose={() => {
                                    this.setState({ dropdownHeight: 40 });
                                }}
                                style={{ backgroundColor: "transparent" }}
                                itemStyle={{
                                    justifyContent: "flex-start"
                                }}
                                dropDownStyle={{ backgroundColor: this.state.light_theme ? "#eee" : "#2a2a2a" }}
                                labelStyle={{
                                    color: this.state.light_theme ? "black" : "white"
                                }}
                                arrowStyle={{
                                    color: this.state.light_theme ? "black" : "white"
                                }}
                                onChangeItem={item =>
                                    this.setState({
                                        previewImage: item.value
                                    })
                                }
                            />
                        </View>

                        <TextInput
                            style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
                            onChangeText={caption => this.setState({ caption })}
                            placeholder={"Legenda"}
                            placeholderTextColor={this.state.light_theme ? "black" : "white"}
                        />
                    </ScrollView>
                </View>
                <View style={{ flex: 0.08 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    containerLight: {
        flex: 1,
        backgroundColor: "white"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28)
    },
    appTitleTextLight: {
        color: "black",
        fontSize: 28,
        paddingLeft: 20
    },
    fieldsContainer: {
        flex: 0.85
    },
    previewImage: {
        width: "93%",
        height: RFValue(250),
        alignSelf: "center",
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: "contain"
    },
    inputFont: {
        height: RFValue(40),
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "white"
    },
    inputFontLight: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        color: "black"
    },
});
