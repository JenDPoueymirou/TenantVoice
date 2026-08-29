import React from 'react';
import AddressSearch from '@/components/search/AddressSearch';

const Search = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Vector Search</h1>
        <p className="text-gray-600 mt-2">
          Search buildings and issues using our vector database. This tool uses semantic search
          to find related information across the database.
        </p>
      </div>
      <AddressSearch />
    </div>
  );
};

export default Search;