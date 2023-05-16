import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const HomeScreen = ({ route }) => {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tweets", {
        headers: {
          Authorization: `Bearer ${route.params.token}`,
        },
      });
      setTweets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => (
          <View style={styles.tweet}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  tweet: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {},
});

export default HomeScreen;