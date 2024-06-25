// src/components/BuisnessMap/BuisnessMap.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./BusinessMap.css";
import { businesses } from "../data/businesses";
import useImageDimensions from "../hooks/useImageDimensions";

const CarouselImage = ({ image, businessName, type, onClick }) => {
  const { width, height } = useImageDimensions(image);
  const aspectRatio = width / height;

  let scaleX, scaleY;
  if (aspectRatio > 1) {
    // Landscape
    scaleX = 1.5;
    scaleY = 1.5;
  } else if (aspectRatio < 1) {
    // Portrait
    scaleX = 1.5;
    scaleY = 2.0;
  } else {
    // Square
    scaleX = 1.3;
    scaleY = 1.3;
  }

  return (
    <div
      className={`carousel-image ${type}`}
      onClick={onClick}
      style={{
        "--scale-x": scaleX,
        "--scale-y": scaleY
      }}
    >
      <img src={image} alt={`${businessName} - ${type}`} />
    </div>
  );
};

const BusinessMap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { photoName } = location.state || { photoName: "" };
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedImageIndexes, setSelectedImageIndexes] = useState({});
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);

  useEffect(() => {
    if (photoName === "wolf1.jpg") {
      setFilteredBusinesses(businesses.filter((b) => b.id >= 5));
    } else {
      setFilteredBusinesses(businesses.filter((b) => b.id <= 5));
    }
  }, [photoName]);

  const customIcon = new L.Icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  const handleImageClick = (businessId, direction) => {
    setSelectedImageIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[businessId] || 0;
      const totalImages = filteredBusinesses.find((b) => b.id === businessId)
        .images.length;
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % totalImages
          : (currentIndex - 1 + totalImages) % totalImages;
      return { ...prevIndexes, [businessId]: newIndex };
    });
  };

  const getDisplayedImages = (images, currentIndex) => {
    const totalImages = images.length;
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
    const nextIndex = (currentIndex + 1) % totalImages;
    return [
      { index: prevIndex, image: images[prevIndex] },
      { index: currentIndex, image: images[currentIndex] },
      { index: nextIndex, image: images[nextIndex] }
    ];
  };

  return (
    <>
    <nav className="nav-bar">
    <div className="nav-container">
      <div className="nav-logo">Ztyle</div>
      <div className="nav-links">
        <a onClick={() => navigate("/")}>Home</a>
      </div>
    </div>
  </nav>
    <div className="business-map-container">
      <div className="map-section">
        <MapContainer
          center={[33.4992, -111.9203]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {businesses.map((business) => (
            <Marker
              key={business.id}
              position={[business.lat, business.lng]}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  setSelectedBusiness(business);
                }
              }}
            >
              <Popup>{business.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="listing-section">
        <h1>Results based off your search</h1>
        <div className="business-list">
          {filteredBusinesses.map((business) => (
            <div
              key={business.id}
              className={`business-card ${
                selectedBusiness && selectedBusiness.id === business.id
                  ? "selected"
                  : ""
              }`}
              onClick={() => setSelectedBusiness(business)}
            >
              <div className="business-info">
                <h2>{business.name}</h2>
                <div className="rating-price">
                  <span className="rating">
                    ★ {business.rating} ({business.reviews} reviews)
                  </span>
                  <span className="price">{business.price}</span>
                </div>
                <p>{business.address}</p>
              </div>
              <div className="image-carousel">
                {getDisplayedImages(
                  business.images,
                  selectedImageIndexes[business.id] || 0
                ).map(({ index, image }, arrayIndex) => (
                  <CarouselImage
                    key={index}
                    image={image}
                    businessName={business.name}
                    type={arrayIndex === 1 ? "main" : "preview"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(
                        business.id,
                        arrayIndex === 0 ? "prev" : "next"
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
};

export default BusinessMap;
