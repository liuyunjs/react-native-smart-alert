import React from 'react';
import { SafeAreaView } from 'react-native';
import { DarklyText } from 'rn-darkly';
import { Alert } from './library/main';

export default function App() {
  const [visible, setVisible] = React.useState(false);

  return (
    <SafeAreaView>
      <DarklyText
        dark_style={{ color: '#ddd' }}
        onPress={() => {
          Alert.alert('标题标题', '打开模态框'.repeat(400), [
            {
              text: '取消',
            },
            {
              text: '确定',
              onPress() {
                setVisible(true);
              },
            },
            {
              text: '确定2',
              onPress() {
                setVisible(true);
              },
            },
          ]);
        }}
        style={{ fontSize: 20 }}>
        show alert
      </DarklyText>

      <Alert
        forceDark
        message={'打开模态框'.repeat(40)}
        title="标题标题"
        actions={[
          {
            text: '取消',
          },
          {
            text: '确定',
            onPress() {
              Alert.custom({
                title: '标题标题',
                message: 'message',
                actions: [
                  {
                    text: '取消',
                  },
                  {
                    text: '确定',
                    onPress() {
                      setVisible(false);
                    },
                  },
                ],
                // children: (
                //   <View>
                //     <DarklyText>TextInput</DarklyText>
                //   </View>
                // ),
              });
            },
          },
        ]}
        visible={visible}
        onWillChange={setVisible}
      />
    </SafeAreaView>
  );
}
