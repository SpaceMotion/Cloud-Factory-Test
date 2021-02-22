import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';

interface AboutProps {}

export function About(props: AboutProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'About us'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
