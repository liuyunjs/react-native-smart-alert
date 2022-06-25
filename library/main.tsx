// @ts-ignore
import { Easing, EasingNode } from 'react-native-reanimated';
import { ModalInternalProps } from 'react-native-smart-modal';
import { Alert as AlertView, AlertProps, Action } from './Alert';

export { AlertAction } from './AlertAction';

const E: any = EasingNode || Easing;

const animConf = { easing: E.inOut(E.circle) };
const namespace = 'Alert' + Math.random().toString(32);

const animation: ModalInternalProps['animation'] = {
  from: { opacity: 0.7, scale: 0.1 },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: { opacity: 0, scale: 0.3 },
};

const withDefaultProps = (
  props: AlertProps & ModalInternalProps,
): AlertProps & ModalInternalProps => ({
  maskCloseable: false,
  backHandlerType: 'disabled',
  keyboardDismissWillHide: true,
  containerStyle: { zIndex: 1000 },
  ...props,
  verticalLayout: 'center',
  horizontalLayout: 'center',
  animation,
  animationConf: animConf,
});

const {
  hide: hideInternal,
  show: showInternal,
  update: updateInternal,
} = AlertView;

export const show = (props: AlertProps & ModalInternalProps) =>
  showInternal(namespace, withDefaultProps(props));

export const hide = (key: string) => hideInternal(namespace, key);

export const update = (props: AlertProps & ModalInternalProps) =>
  updateInternal(namespace, withDefaultProps(props));

export const alert = (title: string, message: string, actions: Action[]) =>
  show({
    actions,
    title,
    message,
  });

export const Alert = Object.assign(AlertView, {
  alert,
  hide,
  /**
   * @deprecated 请使用show方法调用
   */
  custom: show,
  update,
  show,
});

Alert.defaultProps = withDefaultProps({ actions: [] });
