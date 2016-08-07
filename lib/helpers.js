import firebase from 'firebase';
const refs = {};

export function getFirebaseService(context) {
  const firebaseServicePath = context['cerebral-module-firebase'];
  return firebaseServicePath.reduce((services, key) => {
    return services[key];
  }, context.services);
}

export function createRef(path, options = {}) {
  if (path.indexOf('/') >= 0) {
      throw new Error('cerebral-module-firebase: The path "' + path + '" is not valid. Use dot notation for consistency with Cerebral');
  }
  path = path.replace(/\./g, '/');
  return Object.keys(options).reduce((ref, key) => {
    if (key === 'payload') {
      return ref;
    }
    return ref[key](options[key]);
  }, firebase.database().ref(path));
}

export function listenTo(ref, path, event, signal, cb) {
  refs[path] = refs[path] || {};
  refs[path][event] = refs[path][event] || {};
  if (refs[path][event][signal]) {
    refs[path][event][signal].off();
  }
  refs[path][event][signal] = ref;
  ref.on(event, cb, (error) => {
    throw new Error('cerebral-module-firebase: ' + event + ' listener to path ' + path + ', triggering signal: ' + signal + ', gave error: ' + error.message);
  });
}

export function stopListening(path, event, signal) {
  if (!event && !signal) {
    refs[path].off();
    delete refs[path];
  } else if (!signal) {
    refs[path][event].off();
    delete refs[path][event];
  } else {
    refs[path][event][signal].off();
    delete refs[path][event][signal];
  }
}

export function createUser(user) {
    return {
        uid: user.uid,
        isAnonymous: user.isAnonymous,
        providerData: user.providerData,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL
    };
}
