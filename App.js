import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Alert } from './library/main';

export default function App() {
  return (
    <SafeAreaView>
      <Text
        onPress={() => {
          Alert.alert('标题标题', '描述描述描述', [
            {
              text: '取消',
            },
            {
              text: '确定',
            },
          ]);
        }}
        style={{ fontSize: 20 }}>
        show alert
      </Text>
    </SafeAreaView>
  );
}
