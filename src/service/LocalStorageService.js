class LocalStorageService {
    addItemToLocalStorageArray(localStorageKey, item) {
        const items = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        items.push(item);
        localStorage.setItem(localStorageKey, JSON.stringify(items));
    }

    removeAllItems() {
        localStorage.removeItem('jwtToken')
        localStorage.removeItem("userChats")
        localStorage.removeItem("uploadedFiles")
    }
}

export default new LocalStorageService();