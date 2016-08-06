import {
  createRef
} from './helpers';

export default function value(path, options) {
  const ref = createRef(path, options)
  return ref.once('value')
    .then((snapshot) => {
      return {
        key: ref.key(),
        value: snapshot.val()
      };
    })
    .catch((err) => {
      return {
        error: err.message
      };
    });
}
