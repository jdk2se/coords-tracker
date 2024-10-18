import { acceptHMRUpdate, defineStore } from "pinia";
import { IMarker } from "../types/IMarker.ts";

export const useMarkerStore = defineStore('markerStore', {
  state: () => ({
    markers: <IMarker[]>[],
  }),
  actions: {
    async checkStorage() {
      console.log('check local storage');// @TODO DudnikES
    },
    addMarker(lat: number, lng: number) {
      const marker: IMarker = {
        id: this.markers.length + 1,
        lat: lat,
        lng: lng,
      }
      this.markers.push(marker);
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMarkerStore, import.meta.hot));
}