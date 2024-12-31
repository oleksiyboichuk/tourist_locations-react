import { FC } from "react";
import { LocationModel } from "../../models/location.model";
import { Field } from "@headlessui/react";

interface LocationInfoProps {
  locationInfo: LocationModel[];
}

const LocationInfo: FC<LocationInfoProps> = ({ locationInfo }) => {
  return (
    <>
      {locationInfo.map((location: LocationModel, index: number) => (
        <Field key={location.CityId + index} className="mt-6">
          <p className="text-white">{location.TitleMultiLanguage}</p>
          <p className="text-white">{location.Location.split("#")[0]}</p>
          <p className="text-white">{location.Location.split("#")[1]}</p>
        </Field>
      ))}
    </>
  );
};

export default LocationInfo;
