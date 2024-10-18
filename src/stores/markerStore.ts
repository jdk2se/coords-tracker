import { acceptHMRUpdate, defineStore } from "pinia";
import { IMarker } from "../types/IMarker.ts";
import { TLatLng } from "../types/TLatLng.ts";
import { Backend } from "../utility/Backend.ts";

export const useMarkerStore = defineStore('markerStore', {
  state: () => ({
    markers: <IMarker[]>[],
    activeMarker: <IMarker | null>null,
    backendHelper: new Backend(),
    isLoading: false,
  }),
  actions: {
    async fill(markerId: string) {
      this.markers = await this.backendHelper.getItem('MarkersList') as Awaited<Promise<IMarker []>>;
      const activeMarker = this.markers.find((marker) => {
        return marker.id === markerId;
      });      
      
      this.activeMarker = activeMarker ? activeMarker : null;
    },
    setActiveMarker(markerId: string) {
      const activeMarker = this.markers.find((marker) => {
        return marker.id === markerId;
      });
      
      this.activeMarker = activeMarker ? activeMarker : null;
    },
    async addMarker(marker: TLatLng) {
      const newMarker: IMarker = {
        id: `${this.markers.length + 1}`,
        lat: marker.latlng.lat,
        lng: marker.latlng.lng,
      }
      
      this.markers.push(newMarker);
      await this.backendHelper.setItem('MarkersList', JSON.stringify(this.markers));
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMarkerStore, import.meta.hot));
}