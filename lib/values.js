import {
  createRef
} from './helpers';

export default function values(path, options) {
  return new Promise(resolve => {
    createRef(path, options).once('value', (data) => {
      const value = data.val() || {};
      resolve({
        values: Object.keys(value).map(key => ({
          ...value[key],
          [options.valuesKey || 'key']: key
        }))
      });
    });
  }).catch(err => console.log(err))
}
