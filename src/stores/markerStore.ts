import { acceptHMRUpdate, defineStore } from "pinia";
import { IMarker } from "../types/IMarker.ts";

export const useMarkerStore = defineStore('markerStore', {
  state: () => ({
    markers: <IMarker[]>[
      {
        id: '1',
        lat: 44.9,
        lng: 20.4002993
      }
    ],
    activeMarker: <IMarker | null>null,
  }),
  actions: {
    async fill(markerId: string) {
      const activeMarker = this.markers.find((marker) => {
        return marker.id === markerId;
      });      
      
      this.activeMarker = activeMarker ? activeMarker : null;
    },
    addMarker(lat: number, lng: number) {
      const marker: IMarker = {
        id: `${this.markers.length + 1}`,
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