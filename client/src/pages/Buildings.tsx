import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BuildingCard from "@/components/buildings/BuildingCard";
import { Input } from "@/components/ui/input";

type Building = {
  id: number;
  address: string;
  unit: string | null;
  city: string;
  state: string;
  zipCode: string;
  landlord: string;
  createdAt?: string;
  borough?: string;
  lat?: number;
  lng?: number;
  issueCount?: number;
};

// Local Goldmont properties data from 67 buildings
const goldmontBuildings: Building[] = [
  { id: 1, address: "342 West 49th St.", city: "New York", state: "NY", zipCode: "10019", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 2, address: "1633 Lexington Ave.", city: "New York", state: "NY", zipCode: "10029", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 3, address: "1273 Pacific St.", city: "Brooklyn", state: "NY", zipCode: "11216", landlord: "Goldmont", unit: null, borough: "Brooklyn" },
  { id: 4, address: "156 St Nicholas Ave.", city: "Brooklyn", state: "NY", zipCode: "11237", landlord: "Goldmont", unit: null, borough: "Brooklyn" },
  { id: 5, address: "41 West 138th St.", city: "New York", state: "NY", zipCode: "10037", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 6, address: "635 Riverside Dr.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 7, address: "2707 Sedgwick Ave.", city: "Bronx", state: "NY", zipCode: "10468", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 8, address: "601 W 139th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 9, address: "219 W 145th St.", city: "New York", state: "NY", zipCode: "10039", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 10, address: "1015 St Nicholas Ave.", city: "New York", state: "NY", zipCode: "10032", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 11, address: "1373 St Nicholas Ave.", city: "New York", state: "NY", zipCode: "10033", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 12, address: "894 Riverside Dr.", city: "New York", state: "NY", zipCode: "10032", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 13, address: "543 W 162nd St.", city: "New York", state: "NY", zipCode: "10032", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 14, address: "145 Audubon Ave.", city: "New York", state: "NY", zipCode: "10032", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 15, address: "766 Brady Ave.", city: "Bronx", state: "NY", zipCode: "10462", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 16, address: "2485 Devoe Terrace", city: "Bronx", state: "NY", zipCode: "10468", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 17, address: "2141 Mohegan Ave.", city: "Bronx", state: "NY", zipCode: "10460", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 18, address: "1520 Plimpton Ave.", city: "Bronx", state: "NY", zipCode: "10452", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 19, address: "2060 Bronxdale Ave.", city: "Bronx", state: "NY", zipCode: "10462", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 20, address: "2701 Marion Ave.", city: "Bronx", state: "NY", zipCode: "10458", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 21, address: "2532 Valentine Ave.", city: "Bronx", state: "NY", zipCode: "10458", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 22, address: "2105 Tiebout Ave.", city: "Bronx", state: "NY", zipCode: "10457", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 23, address: "265 Burnside Ave.", city: "Bronx", state: "NY", zipCode: "10453", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 24, address: "2064 Anthony Ave.", city: "Bronx", state: "NY", zipCode: "10457", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 25, address: "291 East 143rd St.", city: "Bronx", state: "NY", zipCode: "10451", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 26, address: "2675 Morris Ave.", city: "Bronx", state: "NY", zipCode: "10468", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 27, address: "55 West 110th St.", city: "New York", state: "NY", zipCode: "10026", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 28, address: "235 West 103rd St.", city: "New York", state: "NY", zipCode: "10025", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 29, address: "230 West 101st St.", city: "New York", state: "NY", zipCode: "10025", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 30, address: "130 Lenox Ave.", city: "New York", state: "NY", zipCode: "10026", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 31, address: "203 West 102nd St.", city: "New York", state: "NY", zipCode: "10025", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 32, address: "202 West 92nd St.", city: "New York", state: "NY", zipCode: "10025", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 33, address: "69 East 125th St.", city: "New York", state: "NY", zipCode: "10035", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 34, address: "85 East 10th St.", city: "New York", state: "NY", zipCode: "10003", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 35, address: "342 West 39th St.", city: "New York", state: "NY", zipCode: "10018", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 36, address: "510 Amsterdam Ave.", city: "New York", state: "NY", zipCode: "10024", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 37, address: "507 West 170th St.", city: "New York", state: "NY", zipCode: "10032", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 38, address: "512 West 168th St.", city: "New York", state: "NY", zipCode: "10032", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 39, address: "504 West 167th St.", city: "New York", state: "NY", zipCode: "10032", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 40, address: "431 West 162nd St.", city: "New York", state: "NY", zipCode: "10032", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 41, address: "500 West 148th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 42, address: "503 West 140th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 43, address: "508 West 134th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 44, address: "5 St Nicholas Terrace", city: "New York", state: "NY", zipCode: "10027", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 45, address: "281 Wadsworth Ave.", city: "New York", state: "NY", zipCode: "10033", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 46, address: "75 West 190th St.", city: "Bronx", state: "NY", zipCode: "10468", landlord: "Goldmont", unit: null, borough: "Bronx" },
  { id: 47, address: "34 Hamilton Place", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 48, address: "501 West 172nd St.", city: "New York", state: "NY", zipCode: "10032", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 49, address: "502 West 167th St.", city: "New York", state: "NY", zipCode: "10032", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 50, address: "506 West 150th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 51, address: "501 West 142nd St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 52, address: "503 West 135th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 53, address: "450 Convent Ave.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 54, address: "612 West 180th St.", city: "New York", state: "NY", zipCode: "10033", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 55, address: "607 West 174th St.", city: "New York", state: "NY", zipCode: "10033", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 56, address: "605 West 151st St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 57, address: "602 West 148th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 58, address: "609 West 137th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 59, address: "608 West 137th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 60, address: "603 West 135th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 61, address: "602 West 135th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 62, address: "611 St Nicholas Ave.", city: "New York", state: "NY", zipCode: "10030", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 63, address: "619 St Nicholas Ave.", city: "New York", state: "NY", zipCode: "10030", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 64, address: "621 St Nicholas Ave.", city: "New York", state: "NY", zipCode: "10030", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 65, address: "617 West 143rd St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 66, address: "615 West 143rd St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" },
  { id: 67, address: "601 West 138th St.", city: "New York", state: "NY", zipCode: "10031", landlord: "Goldmont", unit: null, borough: "Manhattan" }
];

const Buildings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Use local data instead of API query
  const buildings = goldmontBuildings;
  const isLoading = false;
  const error = null;

  // Filter buildings based on search term
  const filteredBuildings = buildings?.filter(building => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      building.address.toLowerCase().includes(searchTermLower) ||
      building.city.toLowerCase().includes(searchTermLower) ||
      building.state.toLowerCase().includes(searchTermLower) ||
      building.zipCode.includes(searchTermLower) ||
      building.landlord.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Building Directory</h2>
          <p className="text-neutral-600">Browse buildings or search for a specific address</p>
        </div>
        
        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-neutral-400">search</span>
            </div>
            <Input
              type="text"
              placeholder="Search by address, city, landlord..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Buildings Grid */}
        {isLoading ? (
          <div className="text-center py-10">
            <div className="material-icons animate-spin text-4xl text-primary mb-4">autorenew</div>
            <p className="text-neutral-600">Loading buildings...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="material-icons text-4xl text-status-error mb-4">error</div>
            <p className="text-neutral-600">Failed to load buildings. Please try again later.</p>
          </div>
        ) : filteredBuildings?.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl shadow-sm p-8">
            <div className="material-icons text-4xl text-neutral-400 mb-4">location_off</div>
            <h3 className="text-xl font-medium mb-2">No Buildings Found</h3>
            <p className="text-neutral-600">No buildings match your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBuildings?.map((building) => (
              <BuildingCard key={building.id} building={building} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Buildings;
