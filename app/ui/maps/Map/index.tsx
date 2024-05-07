"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapType } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import turfArea from "@turf/area";

import { MapProps } from "./types";
import { PhysicalAddressParts } from "~types/PhysicalAddress";
import { AppContext, AppDispatchContext } from "~context/AppContext";

const mapboxGeocodeURL = "https://api.mapbox.com/search/geocode/v6/forward";
const zoom = 19;

export const Map = ({ className }: MapProps) => {
  const appContext = useContext(AppContext);
  const appDispatchContext = useContext(AppDispatchContext);
  const physicalAddress = appContext.physicalAddress;

  const drawRef = useRef<MapboxDraw>();
  const markerRef = useRef<mapboxgl.Marker>();
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<MapType>();

  const [lng, setLng] = useState();
  const [lat, setLat] = useState();

  const geocode = useCallback(async () => {
    if (!physicalAddress) return;
    const params = new URLSearchParams({
      street: physicalAddress[PhysicalAddressParts.street] ?? "",
      city: physicalAddress[PhysicalAddressParts.city] ?? "",
      state: physicalAddress[PhysicalAddressParts.state] ?? "",
      postcode: physicalAddress[PhysicalAddressParts.zipcode] ?? "",
      country: physicalAddress[PhysicalAddressParts.country] ?? "US",
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

  const onDraw = () => {
    if (!drawRef.current) return;
    markerRef.current?.remove();

    const data = drawRef.current.getAll();
    if (data.features.length > 0) {
      const area = turfArea(data);
      appDispatchContext.onChangeArea(area);
    }
  };

  useEffect(() => {
    if (!mapRef.current || !lat || !lng) return;
    const mapboxToken = window.ENV.MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      accessToken: mapboxToken,
      container: mapRef.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [lng, lat],
      zoom,
    });

    drawRef.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
        point: true,
      },
      defaultMode: "draw_polygon",
    });

    map.current.addControl(drawRef.current);
    map.current.on("draw.create", onDraw);
    map.current.on("draw.update", onDraw);
    map.current.on("draw.delete", onDraw);
    return () => map.current?.remove();
  }, [mapRef, lat, lng]);

  useEffect(() => {
    if (!physicalAddress) return;
    geocode();
  }, [physicalAddress]);

  return (
    <section className={`w-full h-full relative ${className}`}>
      <div className="h-full w-full" ref={mapRef} />
      <div className="absolute bottom-4 right-4 z-10 flex gap-4">
        {/* <legend className="bg-white">
          <p className="text-sm">Click the map once to start drawing</p>
          <p className="text-sm">Double click to complete your shape</p>
        </legend>

        <button className="bg-white rounded-lg p-4">
          Calculate solar potential
        </button> */}
      </div>
    </section>
  );
};
