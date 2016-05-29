import {
  listenTo,
  createRef
} from './helpers';

export default function createOnChildAdded(controller) {
  return (path, signal, options) => {
    listenTo(
      createRef(path, options),
      path,
      'child_added',
      signal,
      (data) => {
        controller.getSignals(signal)({
          key: data.key,
          value: data.val(),
          ...options.payload
        });
      }
    );
  };
}
