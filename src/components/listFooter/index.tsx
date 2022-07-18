import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

interface FooterProps {
  loading: boolean;
  hasNextPage: boolean;
  isEmpty: boolean;
}

const ListFooter: React.FC<FooterProps> = props => {
  const {loading, hasNextPage, isEmpty} = props;

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }
  if (isEmpty) {
    return <View />;
  }
  if (!hasNextPage) {
    return (
      <View style={styles.notHasNextPage}>
        <View style={styles.left} />
        <Text style={styles.middle}>我也是有底线的</Text>
        <View style={styles.right} />
      </View>
    );
  }

  return null;
};
export default ListFooter;
const styles = StyleSheet.create({
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    fontSize: 12,
  },
  left: {
    width: '100%',
    height: 1,
  },
  right: {
    width: '100%',
    height: 1,
  },
  notHasNextPage: {
    display: 'flex',
    alignItems: 'center',
  },
});
