import { acceptHMRUpdate, defineStore } from "pinia";
import { IMarker } from "../types/IMarker.ts";
import { TLatLng } from "../types/TLatLng.ts";
import { Backend } from "../utility/Backend.ts";
import { addressChecker } from "../utility/helpers.ts";

export const useMarkerStore = defineStore('markerStore', {
  state: () => ({
    markers: <IMarker[]>[],
    activeMarker: <IMarker | null>null,
    backendHelper: new Backend(),
    isLoading: false,
  }),
  actions: {
    async fill(markerId: string) {
      this.isLoading = true;
      this.markers = await this.backendHelper.getItem('MarkersList') as Awaited<Promise<IMarker []>>;
      const activeMarker = this.markers.find((marker) => {
        return marker.id === markerId;
      });      
      
      this.activeMarker = activeMarker ? activeMarker : null;
      this.isLoading = false;
    },
    setActiveMarker(markerId: string) {
      const activeMarker = this.markers.find((marker) => {
        return marker.id === markerId;
      });
      
      this.activeMarker = activeMarker ? activeMarker : null;
    },
    async addMarker(marker: TLatLng): Promise<string> {
      this.isLoading = true;
      const isAddressValid = await addressChecker(marker.latlng.lat, marker.latlng.lng);
      if (!isAddressValid) {
        this.isLoading = false;
        return '';
      }
      
      const markerId = `${this.markers.length + 1}`; 
      const newMarker: IMarker = {
        id: markerId,
        lat: marker.latlng.lat,
        lng: marker.latlng.lng,
      }

      this.markers.push(newMarker);
      await this.backendHelper.setItem('MarkersList', JSON.stringify(this.markers)); 
      this.isLoading = false;
      return markerId;
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMarkerStore, import.meta.hot));
}