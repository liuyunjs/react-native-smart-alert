import { Alert, Action } from './Alert';
export { AlertAction } from './AlertAction';
export const { hide, show, update } = Alert;

export const alert = (title: string, message: string, actions: Action[]) =>
  show({
    actions,
    title,
    message,
  });

const ExportAlert = Object.assign(Alert, {
  alert,
});

export { ExportAlert as Alert };
export default ExportAlert;
