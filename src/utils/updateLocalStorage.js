export const updateLocalStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
}