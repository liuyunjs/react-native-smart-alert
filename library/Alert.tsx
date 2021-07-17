import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  Dimensions,
  TextStyle,
} from 'react-native';
// @ts-ignore
import { Easing, EasingNode } from 'react-native-reanimated';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { modalZIndex } from 'react-native-smart-modal/lib/modalZIndex';
import { zoom } from 'react-native-smart-modal/lib/animations';
import { ModalBaseWithOverlay } from 'react-native-smart-modal/lib/ModalBaseWithOverlay';
import { Divide } from 'rn-divide';
import { PortalStore } from 'react-native-portal-view';
import { AnimatePresence } from 'rmotion';

type Action = {
  text: string;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
};

export type AlertProps = {
  style?: StyleProp<ViewStyle>;
  actions: Action[];
  title?: string;
  message?: string;
  children?: React.ReactNode;
  onRequestClose?: () => void;
  z?: number;
};

const namespace = 'alert';

PortalStore.getUpdater(namespace).setContainer(AnimatePresence);

const E: any = EasingNode || Easing;

const animConf = { easing: E.inOut(E.circle) };

const { height, width } = Dimensions.get('window');

export const Alert = ({
  style,
  actions,
  message,
  title,
  children,
  onRequestClose,
  ...rest
}: AlertProps) => {
  const count = actions.length;
  const isHorizontal = count < 3;

  return (
    <ModalBaseWithOverlay
      {...rest}
      mask
      maskCloseable={false}
      keyboardDismissWillHide
      backHandlerType="disabled"
      animationConf={animConf}
      verticalLayout="center"
      horizontalLayout="center"
      animation={zoom}
      onRequestClose={onRequestClose!}>
      <View style={[styles.container, style]}>
        {!!title && <Text style={styles.title}>{title}</Text>}
        <ScrollView
          bounces={false}
          style={{
            maxHeight:
              height -
              (title ? 76 : 0) -
              (isHorizontal ? 60 : 50 * count) -
              getBottomSpace() -
              getStatusBarHeight(true),
          }}>
          {children}
          {!!message && <Text style={styles.message}>{message}</Text>}
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
                  <Text style={[styles.btnText, action.style]}>
                    {action.text}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </View>
      </View>
    </ModalBaseWithOverlay>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.88,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    marginTop: 34,
    marginBottom: 20,
    marginHorizontal: 15,
  },

  message: {
    fontSize: 14,
    color: '#888',
    marginTop: 14,
    marginBottom: 28,
    marginHorizontal: 15,
    lineHeight: 20,
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
});

Alert.hide = (key: string) => PortalStore.getUpdater(namespace).remove(key);

const ModalAlert = modalZIndex(Alert);

Alert.alert = (title: string, message: string, actions: Action[]): string =>
  PortalStore.getUpdater(namespace).add(
    <ModalAlert z={1000} title={title} message={message} actions={actions} />,
  );
