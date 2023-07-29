// import React, { useState } from 'react';
// import Home from '../pages';

// const teamListCard = () => {
//   // List of items for the dropdown
//   const options = ['Bumble Bees', 'Carpenter Bees', 'Honey Bees', 'Hairy-Foot Bees', 'Pantaloon Bees'];

//   // State to store the selected item from the dropdown
//   const [selectedItem, setSelectedItem] = useState('');

//   // Handler function to update the selected item
//   const handleSelectChange = (event) => {
//     setSelectedItem(event.target.value);
//   };

//   return (
//     <div className="teamListCard">
//       <h2>Dropdown List on a Card</h2>
//       <div>
//         {/* Dropdown list */}
//         <select value={selectedItem} onChange={handleSelectChange}>
//           <option value="">Select an option</option>
//           {options.map((item, index) => (
//             <option key={index} value={item}>
//               {item}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         {/* Display the selected item */}
//         {selectedItem && <p>Selected item: {selectedItem}</p>}
//       </div>
//     </div>
//   );
// };

// export default teamListCard;
