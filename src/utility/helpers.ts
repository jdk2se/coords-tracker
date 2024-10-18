import axios from "axios";
import { TAddress } from "../types/TAddress.ts";

export async function addressChecker(lat: number, lng: number): Promise<boolean> {
  return new Promise(async (res) => {
    const result = await axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=6711410c6647e680114395jfk9a8f2b`);
    const address: TAddress = result.data.address;

    if (address.house_number && address.postcode) {
      res(true);
    }
    res(false);
  });
  
}