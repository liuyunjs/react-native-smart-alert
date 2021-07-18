import React from 'react';
import { SafeAreaView } from 'react-native';
import { DarklyText } from 'rn-darkly';
import { Alert } from './library/main';

export default function App() {
  return (
    <SafeAreaView>
      <DarklyText
        darkStyle={{ color: '#ddd' }}
        onPress={() => {
          Alert.alert('标题标题', '描述描述描述', [
            {
              text: '取消',
            },
            {
              text: '确定',
              onPress() {},
            },
          ]);
        }}
        style={{ fontSize: 20 }}>
        show alert
      </DarklyText>
    </SafeAreaView>
  );
}
