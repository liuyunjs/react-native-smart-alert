import * as React from 'react';
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
  dark_style?: StyleProp<TextStyle>;
};

export type AlertProps = {
  style?: StyleProp<ViewStyle>;
  actions: Action[];
  title?: string;
  message?: string;
  children?: React.ReactNode;
  onRequestClose: () => void;
};

const { height } = Dimensions.get('window');

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
      dark_style={styles.darkContainer}
      style={[styles.container, style]}>
      {!!title && (
        <DarklyText dark_style={styles.darkTitle} style={styles.title}>
          {title}
        </DarklyText>
      )}
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        style={{
          width: '100%',
          maxHeight:
            height -
            (title ? 76 : 0) -
            (isHorizontal ? 60 : 50 * count) -
            getBottomSpace() -
            getStatusBarHeight(true),
        }}>
        {children}
        {!!message && (
          <DarklyText dark_style={styles.darkMessage} style={styles.message}>
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
