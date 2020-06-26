const storage = window.localStorage;
export const getAccessToken = () => storage.getItem("access_token");
export const getUser = () => storage.getItem("user");
export const setUser = (user) => storage.setItem("user", user);
export const setAccessToken = (token) => storage.setItem("access_token", token);
export const removeAccessToken = () => storage.removeItem("access_token");
export const setLogin = (login) => storage.setItem("login", login);
export const getLogin = () => storage.getItem('login');
export const isLoggedIn = () => getLogin();
export const clearLogin = () => storage.clear();

export const setComponent = (component) => storage.setItem("component_name", component);
export const getComponent = () => storage.getItem('component_name');

//# sourceMappingURL=helpers.js.map