import { Alert, Action } from './Alert';

export { AlertAction } from './AlertAction';

export const { hide, show, update } = Alert;

/**
 * @deprecated 请使用show方法调用
 */
// @ts-ignore
export const custom: typeof show = (...args) => {
  console.warn('[rn-smart-alert]: custom 方法将会被遗弃，请使用 show 方法调用');
  // @ts-ignore
  return show(...args);
};

export const alert = (title: string, message: string, actions: Action[]) =>
  show({
    actions,
    title,
    message,
  });

const ExportAlert = Object.assign(Alert, {
  alert,

  /**
   * @deprecated 请使用show方法调用
   */
  custom,
});

export { ExportAlert as Alert };
export default ExportAlert;
