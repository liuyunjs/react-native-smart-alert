import React from 'react';
// @ts-ignore
import { Easing, EasingNode } from 'react-native-reanimated';
import { Modal, ModalBaseWithOverlayProps } from 'react-native-smart-modal';
import { Alert as AlertView, Action } from './Alert';

const E: any = EasingNode || Easing;

const animConf = { easing: E.inOut(E.circle) };
const animation: ModalBaseWithOverlayProps['animation'] = {
  from: { opacity: 0.7, scale: 0.1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

const namespace = 'Alert';

export const custom = (props: ModalBaseWithOverlayProps) => {
  return Modal.add(namespace, {
    maskCloseable: false,
    backHandlerType: 'disabled',
    keyboardDismissWillHide: true,
    z: 1000,
    ...props,
    verticalLayout: 'center',
    horizontalLayout: 'center',
    animation,
    animationConf: animConf,
  });
};

export const hide = (key: string) => {
  Modal.remove(namespace, key);
};

export const alert = (title: string, message: string, actions: Action[]) => {
  const key = custom({
    children: (
      <AlertView
        onRequestClose={() => hide(key)}
        title={title}
        message={message}
        actions={actions}
      />
    ),
  });
  return key;
};

export const Alert = {
  hide,
  alert,
  custom,
};