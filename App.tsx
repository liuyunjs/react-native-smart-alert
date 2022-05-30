import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { DarklyText } from 'rn-darkly';
import { Modal } from 'react-native-smart-modal';
import { Alert, AlertView } from './library/main';

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

      <Modal visible={visible} onWillChange={setVisible}>
        <View style={{ height: 200, backgroundColor: 'red' }}>
          <DarklyText
            dark_style={{ color: '#ddd' }}
            onPress={() => {
              const key = Alert.custom({
                children: (
                  <AlertView
                    title="标题标题"
                    message="message"
                    actions={[
                      {
                        text: '取消',
                      },
                      {
                        text: '确定',
                        onPress() {
                          setVisible(false);
                        },
                      },
                    ]}
                    onRequestClose={() => Alert.hide(key)}>
                    <View>
                      <DarklyText>TextInput</DarklyText>
                    </View>
                  </AlertView>
                ),
              });

              // Alert.alert('标题标题', '关闭模态框'.repeat(400), [
              //   {
              //     text: '取消',
              //   },
              //   {
              //     text: '确定',
              //     onPress() {
              //       setVisible(false);
              //     },
              //   },
              // ]);
            }}
            style={{ fontSize: 20 }}>
            close modal
          </DarklyText>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
