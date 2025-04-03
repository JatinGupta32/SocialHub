// import React from "react";
// import usePlacesAutocomplete from "use-places-autocomplete";

// const LocationAutocomplete = ({ onSelect }) => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = (address) => {
//     setValue(address, false);
//     clearSuggestions();
//     onSelect(address); // Only storing the address
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         placeholder="Search location..."
//         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//       />
//       {status === "OK" && (
//         <ul className="bg-white border border-gray-300 rounded-md mt-1">
//           {data.map(({ place_id, description }) => (
//             <li
//               key={place_id}
//               onClick={() => handleSelect(description)}
//               className="cursor-pointer p-2 hover:bg-gray-200"
//             >
//               {description}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LocationAutocomplete;

import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

const LocationAutocomplete = ({ onSelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = (address) => {
    setValue(address, false);
    clearSuggestions();
    onSelect(address); // Update formData with only the address
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Search location..."
        className="px-4 w-full py-3 rounded-xl border border-slate-300"
      />
      {status === "OK" && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md w-full mt-1">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;