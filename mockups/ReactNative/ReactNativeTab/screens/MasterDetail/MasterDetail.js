import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Platform,
} from "react-native";

import sampleData from "../../data/sampleData";
import useThemeContext from "../../hooks/useThemeContext";
import themes from "../../themes";
import ItemDetail from "./ItemDetail";
import ListItem from "./ListItem";

function MasterDetail({ navigation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  // TODO HERE: Change this
  //Add theme support for color styles here
  const { width, height } = useWindowDimensions();
  const isWindowsPlatform = width > height;

  const { theme } = useThemeContext();
  const selectedTheme = themes[theme];

  const handleOnPress = (item) => {
    setSelectedItem(item);
    if (!isWindowsPlatform) {
      navigation.navigate("MasterDetailDetail", { item });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: selectedTheme.colors.background}]}>
      {/* MASTER DETAIL LIST */}
      <View style={styles.listContainer}>
        <FlatList
          data={sampleData.textAssets}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onPress={() => handleOnPress(item)}
              isSelected={selectedItem && selectedItem.id === item.id}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {/* MASTER DETAIL DETAIL */}
      {isWindowsPlatform && (
        <View style={styles.itemDetailContainer}>
          <ItemDetail item={selectedItem} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  listContainer: {
    flex: 1,
  },

  itemDetailContainer: {
    flex: 2.5,
    borderLeftColor: "#cdcdcd",
    borderLeftWidth: 1,
  },

  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#cdcdcd",
  },
});

export default MasterDetail;
