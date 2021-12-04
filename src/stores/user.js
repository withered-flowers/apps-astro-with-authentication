// For Vue User references:
// atom = state
// action = mutation
// task = action
import { atom, action, task } from "nanostores";
// Since we need to use "localStorage", we need nanostores persistent
import { persistentAtom } from "@nanostores/persistent";

// this is the "state"
export const isLoggedIn = atom(false);
// this will be saved persistently to localStorage
export const authenticationToken = persistentAtom("authentication_token", "");

export const mutateIsLoggedIn = action(
  isLoggedIn,
  "mutateIsLoggedIn",
  (store, payload) => {
    store.set(payload);
    return store.get();
  }
);

export const tryLogin = async (objCredential) => {
  await task(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const result = await response.json();

    // Just a fake logic to do a login
    result.forEach((e) => {
      if (e.username.toLowerCase() === objCredential.username.toLowerCase()) {
        authenticationToken.set("imjustloggedinyayyy");
        // set the state of isLoggedIn to true
        mutateIsLoggedIn(true);
      }
    });
  });
};

export const tryLogout = async () => {
  await task(async () => {
    // clear the authenticationToken
    authenticationToken.set("");
    // set the state of isLoggedIn to false
    mutateIsLoggedIn(false);
  });
};
