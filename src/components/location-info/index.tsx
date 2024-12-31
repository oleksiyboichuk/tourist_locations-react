import { FC } from "react";
import { LocationModel } from "../../models/location.model";

interface LocationInfoProps {
  locationInfo: LocationModel[];
}

const LocationInfo: FC<LocationInfoProps> = ({ locationInfo }) => {
  return <>{locationInfo}</>;
};

export default LocationInfo;