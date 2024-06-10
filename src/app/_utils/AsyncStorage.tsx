const AsyncStorage = {
    setItem: (key: string, value: string): Promise<void> => {
      return new Promise((resolve) => {
        localStorage.setItem(key, value);
        resolve();
      });
    },
    getItem: (key: string): Promise<string | null> => {
      return new Promise((resolve) => {
        const item = localStorage.getItem(key);
        resolve(item);
      });
    },
    removeItem: (key: string): Promise<void> => {
      return new Promise((resolve) => {
        localStorage.removeItem(key);
        resolve();
      });
    }
  };
  
  export default AsyncStorage;
  