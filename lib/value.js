import {
  createRef
} from './helpers';

export default function value(path, options) {
  return new Promise(resolve => {
    createRef(path, options).once('value', (data) => {
      resolve({
        value: data.val()
      });
    });
  });
}
