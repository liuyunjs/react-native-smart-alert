import * as React from 'react';
import {
  View,
  ViewStyle,
  ScrollView,
  StyleProp,
  Dimensions,
  TextStyle,
} from 'react-native';
// @ts-ignore
import { Easing, EasingNode } from 'react-native-reanimated';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { Divide } from 'rn-divide';
import { DarklyView, DarklyText } from 'rn-darkly';
import {
  ModalInternal,
  ModalInternalProps,
  withModal,
} from 'react-native-smart-modal';
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
  onRequestClose?: () => void;
  forceDark?: boolean;
};

const { height } = Dimensions.get('window');

const AlertInternal: React.FC<AlertProps> = ({
  style,
  actions,
  message,
  title,
  children,
  onRequestClose,
  forceDark,
}) => {
  const count = actions.length;
  const isHorizontal = count < 3;

  return (
    <DarklyView
      forceDark={forceDark}
      dark_style={styles.darkContainer}
      style={[styles.container, style]}>
      {!!title && (
        <DarklyText
          forceDark={forceDark}
          dark_style={styles.darkTitle}
          style={styles.title}>
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
          <DarklyText
            forceDark={forceDark}
            dark_style={styles.darkMessage}
            style={styles.message}>
            {message}
          </DarklyText>
        )}
      </ScrollView>
      <Divide forceDark={forceDark} />
      <View style={isHorizontal ? styles.hBtnGroup : styles.vBtnGroup}>
        {actions.map((action, index) => {
          return (
            <AlertAction
              {...action}
              forceDark={forceDark}
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

const E: any = EasingNode || Easing;
const animConf = { easing: E.inOut(E.circle) };

const animation: ModalInternalProps['animation'] = {
  from: { opacity: 0.7, scale: 0.1 },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: { opacity: 0, scale: 0.3 },
};

const Alert: React.FC<
  AlertProps &
    Omit<
      ModalInternalProps,
      | 'verticalLayout'
      | 'horizontalLayout'
      | 'animation'
      | 'animationConf'
      | 'animationIn'
      | 'animationOut'
    >
> = ({ style, actions, message, title, children, ...rest }) => {
  return (
    <ModalInternal
      {...rest}
      containerStyle={[{ zIndex: 1000 }, rest.containerStyle]}
      verticalLayout="center"
      horizontalLayout="center"
      animation={animation}
      animationConf={animConf}>
      <AlertInternal
        forceDark={rest.forceDark}
        message={message}
        style={style}
        onRequestClose={rest.onRequestClose}
        actions={actions}
        title={title}>
        {children}
      </AlertInternal>
    </ModalInternal>
  );
};

Alert.defaultProps = {
  maskCloseable: false,
  backHandlerType: 'disabled',
  keyboardDismissWillHide: true,
};

const ModalAlert = withModal(Alert);

export { ModalAlert as Alert };
