import {
  listenTo,
  createRef
} from './helpers';

export default function createOnValue(controller) {
  return (path, signal, options) => {
    listenTo(
      createRef(path, options).catch((error) => {throw error}),
      path,
      'value',
      signal,
      (data) => {
        controller.getSignals(signal)({
          value: data.val()
        });
      }
    );
  };
}
