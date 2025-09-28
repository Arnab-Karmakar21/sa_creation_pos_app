import { LocationItem } from "../../Models/LocationModels"

export enum LocationActionTypes {
  Set_Location_Success = "[LOCATION] Set Location Success",
  Clear_Location_Data = "[CAMERA] Clear Location Data",
}

export const SetLocationSuccess = (payload: LocationItem) => {
  return { type: LocationActionTypes.Set_Location_Success, payload: payload }
}

export const ClearLocationData = () => {
  return { type: LocationActionTypes.Clear_Location_Data }
}