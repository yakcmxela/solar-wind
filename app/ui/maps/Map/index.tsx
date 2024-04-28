"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapType } from "mapbox-gl";

import { MapProps } from "./types";
import { Card } from "~ui/cards/Card";

type FeatureContext = {
  country: string;
  district: string;
  place: string;
  postcode: string;
  region: string;
};

const mapboxURL = "https://api.mapbox.com/search/geocode/v6/forward";

export const Map = ({ className, displayContext, zip }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<MapType>();

  const [featureContext, setFeatureContext] = useState<FeatureContext>();
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [zoom, setZoom] = useState(10);

  const geocodeZip = useCallback(async () => {
    const params = new URLSearchParams({
      postcode: zip,
      country: "US",
      access_token: window.ENV.MAPBOX_TOKEN,
    });

    const response = await fetch(`${mapboxURL}?${params.toString()}`);

    const data = await response.json();

    if (!data || !(data.features || []).length) {
      return;
    }

    const feature = data.features[0];

    const [longitude, latitude] = feature.geometry.coordinates;
    const { context } = feature.properties;

    setLng(longitude);
    setLat(latitude);

    if (context) {
      setFeatureContext({
        country: context.country?.name ?? "n/a",
        district: context.district?.name ?? "n/a",
        place: context.place?.name ?? "n/a",
        postcode: context.postcode?.name ?? "n/a",
        region: context.region?.name ?? "n/a",
      });
    }
  }, [zip]);

  useEffect(() => {
    geocodeZip();
  }, [zip]);

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

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);

    return () => map.current?.remove();
  }, [mapRef, lat, lng]);

  return (
    <section className="relative">
      <div
        className={`w-[100vw] h-[300px] relative ${className}`}
        ref={mapRef}
      ></div>
      {displayContext && featureContext && (
        <Card className="absolute rounded-t-none top-0 right-0 z-10">
          <ul>
            <li className="text-sm">
              <strong>Country:</strong> {featureContext.country}
            </li>
            <li className="text-sm">
              <strong>District: </strong>
              {featureContext.district}
            </li>
            <li className="text-sm">
              <strong>Place: </strong>
              {featureContext.place}
            </li>
            <li className="text-sm">
              <strong>Postcode: </strong>
              {featureContext.postcode}
            </li>
            <li className="text-sm">
              <strong>Region: </strong>
              {featureContext.region}
            </li>
          </ul>
        </Card>
      )}
    </section>
  );
};
