import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  Dimensions,
  TextStyle,
} from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { Divide } from 'rn-divide';
import { DarklyView, DarklyText } from 'rn-darkly';

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

export const Alert = ({
  style,
  actions,
  message,
  title,
  children,
  onRequestClose,
}: // ...rest
AlertProps) => {
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
            <React.Fragment key={action.text}>
              {!!index && (
                <Divide
                  horizontal={!isHorizontal}
                  offset={isHorizontal ? 5 : 10}
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  onRequestClose?.();
                  action.onPress?.();
                }}
                style={isHorizontal ? styles.hBtn : styles.vBtn}>
                <DarklyText
                  darkStyle={[styles.darkBtnText, action.darkStyle]}
                  style={[styles.btnText, action.style]}>
                  {action.text}
                </DarklyText>
              </TouchableOpacity>
            </React.Fragment>
          );
        })}
      </View>
    </DarklyView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.88,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  darkContainer: {
    backgroundColor: '#333',
  },

  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    marginTop: 34,
    marginBottom: 20,
    marginHorizontal: 15,
  },

  darkTitle: {
    color: '#eee',
  },

  message: {
    fontSize: 14,
    color: '#666',
    marginTop: 14,
    marginBottom: 28,
    marginHorizontal: 15,
    lineHeight: 20,
  },

  darkMessage: {
    color: '#bbb',
  },

  hBtnGroup: {
    flexDirection: 'row',
    height: 60,
  },

  vBtnGroup: {
    width: '100%',
  },

  hBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flex: 1,
  },

  vBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
  },

  btnText: {
    fontSize: 18,
    color: '#555',
  },

  darkBtnText: {
    color: '#ddd',
  },
});
