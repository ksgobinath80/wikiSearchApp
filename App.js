import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  ScrollView,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import axios from "axios";
import WebView from "react-native-webview";

export default function App() {
  const [data, setData] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [iframeURL, setIframeURL] = React.useState("");

  React.useEffect(() => {}, []);

  ActivityIndicatorLoadingView = () => {
    return (
      <ActivityIndicator size="large" style={styles.ActivityIndicatorStyle} />
    );
  };

  async function fetchData(value) {
    try {
      const res = await axios.get(
        `https://en.wikipedia.org/w/api.php?search=${value}&limit=20&format=json&action=opensearch&origin=*`
      );
      setData(res.data);
    } catch (e) {}
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.container}>
        {iframeURL === "" && (
          <React.Fragment>
            <View>
              <Text style={styles.title}>Enter your keyword below: </Text>
            </View>
            <View style={styles.searchWapper}>
              <TextInput
                style={styles.searchTextInput}
                placeholder="Search to find what yu want!"
                clearButtonMode={"always"}
                autoCapitalize="none"
                clearTextOnFocus={true}
                keyboardType="default"
                value={inputValue}
                onChangeText={text => {
                  setInputValue(text);
                }}
              />
              <TouchableOpacity
                style={styles.searchBtn}
                onPress={() => {
                  fetchData(inputValue);
                }}
              >
                <Text>Search</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, width: "100%" }}>
              {data && (
                <View>
                  <Text style={styles.searchResultTitle}>{data[0]}</Text>
                  <ScrollView>
                    <View>
                      {data[1].map((i, k) => (
                        <View key={i} style={styles.searchResultList}>
                          <Text onPress={() => setIframeURL(data[3][k])}>
                            {i}
                          </Text>
                        </View>
                      ))}
                    </View>
                    <View>
                      <Text style={styles.searchResultText}>{data[2]}</Text>
                    </View>
                  </ScrollView>
                </View>
              )}
            </View>
          </React.Fragment>
        )}

        {iframeURL !== "" && (
          <React.Fragment>
            <ScrollView style={styles.searchResultContent}>
              <WebView
                renderLoading={this.ActivityIndicatorLoadingView}
                startInLoadingState={true}
                source={{
                  uri: iframeURL
                }}
                style={{
                  flex: 1,
                  height: 1000
                }}
              />
            </ScrollView>
            <View style={styles.btnWapper}>
              <TouchableOpacity
                onPress={() => setIframeURL("")}
                style={styles.backBtnBG}
              >
                <Text style={styles.backBtn}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkBtnBG}
                onPress={() => {
                  Linking.openURL("https://www.anthem.com/");
                }}
              >
                <Text style={styles.linkBtn}>Anthem</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
    marginTop: 35
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15
  },
  searchWapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "83%"
  },
  searchTextInput: {
    width: "85%",
    borderColor: "#373737",
    borderWidth: 1,
    padding: 10
  },
  searchBtn: {
    backgroundColor: "#00aeef",
    borderRadius: 5,
    width: 100,
    padding: 12,
    alignItems: "center",
    marginLeft: 10
  },

  searchResultTitle: {
    color: "#373737",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    textTransform: "capitalize"
  },
  searchResultList: {
    backgroundColor: "#d1d1d1",
    marginBottom: 5,
    padding: 5
  },

  searchResultText: { marginTop: 20 },

  searchResultContent: {
    marginTop: 20
  },
  btnWapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  backBtnBG: {
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center"
  },
  backBtn: {
    color: "#ffffff"
  },

  linkBtnBG: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#d1d1d1",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center"
  },
  linkBtn: {
    color: "#373737"
  },
  ActivityIndicatorStyle: {
    color: "#009688",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
