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
  createdAt: string;
};

const Buildings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: buildings, isLoading, error } = useQuery<Building[]>({
    queryKey: ['/api/buildings'],
  });

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
