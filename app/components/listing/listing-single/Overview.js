import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CarDetails } from "@/app/api/useTanStackQuery"; // Adjust import path as per your project structure

const Overview = () => {
  const [carData, setCarData] = useState([]); // Initialize carData as null or an appropriate initial value
  const { slugs } = useParams();

  const carData1 = [
    { label: "Make" }, // Use carData.brand_name if carData is not null
    { label: "Model"}, // Use carData.model if carData is not null
    { label: "Color"}, // Example: Access other properties like color
    { label: "Drive Type"},
    { label: "Transmission"},
    { label: "Condition"},
    { label: "Year"},
    { label: "Mileage"},
    { label: "Fuel Type"},
    { label: "Engine Size"},
    { label: "Doors"},
    { label: "Cylinders"},
    { label: "VIN"},
  ];

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const fetchedCarData = await CarDetails(slugs && slugs?.[0]); // Fetch car details based on slugs (car ID or identifier)
        setCarData(fetchedCarData); // Update carData state with fetched data
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarData();
  }, [slugs]);  

  return (
    <ul className="list-group">
      {carData.map((item, index) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-start"
          key={index}
        >
          <div className="me-auto">
            <div className="day">Make</div>
            <div className="day">Model</div>
            <div className="day">Color</div>
            <div className="day">Drive Type</div>
            <div className="day"> Transmission</div>
            <div className="day">Condition</div>
            <div className="day">Year</div>
            <div className="day">Mileage</div>
            <div className="day">Fuel Type</div>
            <div className="day">Engine Size</div>
            <div className="day">Doors</div>
            <div className="day">Cylinders</div>
            <div className="day">VIN</div>

           

          </div>
          <div className="me-auto">
          <div className="day">{item.brand_name}</div>
          <div className="day">{item.model}</div>
          <div className="day">{item.model}</div>
          <div className="day">{item.model}</div>

         </div>
        </li>
      ))}
    </ul>
  );
};

export default Overview;
