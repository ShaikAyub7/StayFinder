import React from "react";

const GridLayout = (location, PopularHome) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2 overflow-x-auto pb-2 mt-4 scrollbar-hide">
      {PopularHome.length === 0 ? (
        <p>No homes in {location} found.</p>
      ) : (
        PopularHome.map((home) => (
          <Card
            key={home.id}
            className="w-[220px] min-w-[220px]  p-3 rounded-lg shadow-md hover:shadow-lg transition duration-200 gap-1.5 relative"
          >
            <ShortList id={home.id} />
            <Link key={home.id} href={`/${home.id}`} className=" ">
              <img
                src={home.imageUrls[0]}
                alt={home.title}
                className="w-full h-[180px] rounded-md object-cover mb-2"
              />
              <h3 className="font-medium text-lg truncate">{home.title}</h3>
              <div className="flex text-sm gap-x-2 text-gray-500">
                <p className=" ">₹{home.pricePerNight} per night</p>
                <p>⭐ {home.rating}</p>
              </div>
            </Link>
          </Card>
        ))
      )}
    </div>
  );
};

export default GridLayout;
