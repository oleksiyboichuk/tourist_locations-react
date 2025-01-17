import {GoogleLocationsModel, GoogleLocationsResponseModel} from "../../models/google-location.model";

const TouristLocationTable = ({locations}: { locations: GoogleLocationsResponseModel }) => {
    const touristLocations = locations.results;

    console.log('locations', locations);

    return (
        <div className="">
            <table className="w-full border-collapse text-white">
                <thead>
                <tr className="bg-gray-800">
                    <th className="border border-gray-600 p-2">Вибір</th>
                    <th className="border border-gray-600 p-2">Ім'я</th>
                    <th className="border border-gray-600 p-2">Адреса</th>
                    <th className="border border-gray-600 p-2">Тип</th>
                    <th className="border border-gray-600 p-2">Бізнес статус</th>
                    <th className="border border-gray-600 p-2">Рейтинг</th>
                </tr>
                </thead>
                <tbody>
                {touristLocations.map((location: GoogleLocationsModel) => (
                    <tr key={location.place_id} className="bg-transparent">
                        <td className="border border-gray-600 p-2 text-center">
                            <label className="relative inline-flex items-center">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="peer appearance-none h-5 w-5 border border-gray-500 rounded-sm bg-gray-800 checked:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span
                                    className="absolute inset-0 flex items-center justify-center text-white pointer-events-none peer-checked:opacity-100 opacity-0">
                                    ✓
                                </span>
                            </label>
                        </td>
                        <td className="border border-gray-600 p-2">{location.name}</td>
                        <td className="border border-gray-600 p-2">{location.formatted_address}</td>
                        <td className="border border-gray-600 p-2">{location.types.join(', ')}</td>
                        <td className="border border-gray-600 p-2">{location.business_status}</td>
                        <td className="border border-gray-600 p-2 text-center">{location.rating}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TouristLocationTable;
