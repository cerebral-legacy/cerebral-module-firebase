import firebase from 'firebase';
import {
  stopListening,
  getFirebaseService
} from './helpers';
import signInAnonymouslyService from './signInAnonymously';
import getUserService from './getUser';
import createOnChildAdded from './createOnChildAdded';
import createOnChildRemoved from './createOnChildRemoved';
import createOnChildChanged from './createOnChildChanged';
import createOnValue from './createOnValue';
import createTask from './createTask';
import value from './value';
import createUserWithEmailAndPassword from './createUserWithEmailAndPassword';
import signInWithEmailAndPassword from './signInWithEmailAndPassword';
import signOutService from './signOut';
import signInWithFacebook from './signInWithFacebook';

export function signInAnonymously(context) {
  const firebaseService = getFirebaseService(context);
  firebaseService.signInAnonymously()
    .then(context.output.success)
    .catch(context.output.error);
}
signInAnonymously.outputs = ['success', 'error'];
signInAnonymously.async = true;

export function getUser(context) {
  const firebaseService = getFirebaseService(context);
  firebaseService.getUser()
    .then(context.output.success)
    .catch(context.output.error);
}
getUser.outputs = ['success', 'error'];
getUser.async = true;

export function signOut(context) {
  const firebaseService = getFirebaseService(context);
  firebaseService.signOut()
    .then(context.output.success)
    .catch(context.output.error);
}
signOut.outputs = ['success', 'error'];
signOut.async = true;

export default (options = { payload: {} }) => (module, controller) => {
  controller.addContextProvider({
    'cerebral-module-firebase': module.path
  });
  firebase.initializeApp(options.config);
  module.addServices({
    getUser: getUserService,
    signInAnonymously: signInAnonymouslyService,
    signInWithFacebook: signInWithFacebook,
    off: stopListening,
    onChildAdded: createOnChildAdded(controller),
    onChildRemoved: createOnChildRemoved(controller),
    onChildChanged: createOnChildChanged(controller),
    onValue: createOnValue(controller),
    value,
    task: createTask(options),
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut: signOutService
  });
};
