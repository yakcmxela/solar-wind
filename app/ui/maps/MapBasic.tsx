"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapType } from "mapbox-gl";

import { AddressPhysical, AddressPhysicalParts } from "~types/Address";

const mapboxGeocodeURL = "https://api.mapbox.com/search/geocode/v6/forward";

export const MapBasic = ({
  className,
  physicalAddress,
  zoom = 10,
}: {
  className?: string;
  physicalAddress: AddressPhysical;
  zoom: number;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker>();
  const map = useRef<MapType>();

  const [lng, setLng] = useState();
  const [lat, setLat] = useState();

  const geocode = useCallback(async () => {
    if (!physicalAddress) return;
    const params = new URLSearchParams({
      street: physicalAddress[AddressPhysicalParts.street] ?? "",
      city: physicalAddress[AddressPhysicalParts.city] ?? "",
      state: physicalAddress[AddressPhysicalParts.state] ?? "",
      postcode: physicalAddress[AddressPhysicalParts.zipcode] ?? "",
      country: physicalAddress[AddressPhysicalParts.country] ?? "US",
      access_token: window.ENV.MAPBOX_TOKEN,
    });

    const response = await fetch(`${mapboxGeocodeURL}?${params.toString()}`);

    const data = await response.json();

    if (!data || !(data.features || []).length) {
      return;
    }

    const feature = data.features[0];

    const [longitude, latitude] = feature.geometry.coordinates;
    setLng(longitude);
    setLat(latitude);
  }, [physicalAddress]);

  useEffect(() => {
    if (!mapRef.current || !lat || !lng) return;
    const mapboxToken = window.ENV.MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      accessToken: mapboxToken,
      container: mapRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom,
    });

    markerRef.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);

    return () => map.current?.remove();
  }, [mapRef, lat, lng]);

  useEffect(() => {
    if (!physicalAddress) return;
    geocode();
  }, [physicalAddress]);

  return (
    <section className={`w-full h-full relative ${className}`}>
      <div className="h-full w-full" ref={mapRef} />
    </section>
  );
};
