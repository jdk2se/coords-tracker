export class Backend {
  public async setItem(key: string, value: string){
    return Promise.resolve().then(() => {
      localStorage.setItem(key, value);  
    });    
  }
  
  public async getItem(key: string) {
    return Promise.resolve().then(() => {
      const markersList = localStorage.getItem(key);
      if (!markersList) return [];
      
      return JSON.parse(markersList);
    })
  }
}