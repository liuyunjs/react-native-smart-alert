import React from 'react';
// @ts-ignore
import { Easing, EasingNode } from 'react-native-reanimated';
import { Modal } from 'react-native-smart-modal';
import { ModalInternalProps } from 'react-native-smart-modal/dist/types';
import { Alert as AlertView, Action } from './Alert';

const E: any = EasingNode || Easing;

const animConf = { easing: E.inOut(E.circle) };
const animation: ModalInternalProps['animation'] = {
  from: { opacity: 0.7, scale: 0.1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

const namespace = 'Alert' + Math.random().toString(32);

export const custom = (props: ModalInternalProps) => {
  return Modal.add(namespace, {
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
