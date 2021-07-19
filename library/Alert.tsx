import React from 'react';
import {
  View,
  ViewStyle,
  ScrollView,
  StyleProp,
  Dimensions,
  TextStyle,
} from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { Divide } from 'rn-divide';
import { DarklyView, DarklyText } from 'rn-darkly';
import { styles } from './styles';
import { AlertAction } from './AlertAction';

export type Action = {
  text: string;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
  darkStyle?: StyleProp<TextStyle>;
};

export type AlertProps = {
  style?: StyleProp<ViewStyle>;
  actions: Action[];
  title?: string;
  message?: string;
  children?: React.ReactNode;
  onRequestClose: () => void;
};

const { height, width } = Dimensions.get('window');

export const Alert: React.FC<AlertProps> = ({
  style,
  actions,
  message,
  title,
  children,
  onRequestClose,
}) => {
  const count = actions.length;
  const isHorizontal = count < 3;

  return (
    <DarklyView
      darkStyle={styles.darkContainer}
      style={[styles.container, style]}>
      {!!title && (
        <DarklyText darkStyle={styles.darkTitle} style={styles.title}>
          {title}
        </DarklyText>
      )}
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        style={{
          maxHeight:
            height -
            (title ? 76 : 0) -
            (isHorizontal ? 60 : 50 * count) -
            getBottomSpace() -
            getStatusBarHeight(true),
        }}>
        {children}
        {!!message && (
          <DarklyText darkStyle={styles.darkMessage} style={styles.message}>
            {message}
          </DarklyText>
        )}
      </ScrollView>
      <Divide />
      <View style={isHorizontal ? styles.hBtnGroup : styles.vBtnGroup}>
        {actions.map((action, index) => {
          return (
            <AlertAction
              {...action}
              divideVisible={!!index}
              horizontal={isHorizontal}
              onPress={() => {
                onRequestClose?.();
                action.onPress?.();
              }}
              key={action.text}
            />
          );
        })}
      </View>
    </DarklyView>
  );
};
