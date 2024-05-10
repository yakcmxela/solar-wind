"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapType } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import turfArea from "@turf/area";

import { AddressPhysical, AddressPhysicalParts } from "~types/Address";
import {
  PotentialContext,
  PotentialDispatchContext,
} from "~context/PotentialContext";
import { Card } from "~ui/cards/Card";

const mapboxGeocodeURL = "https://api.mapbox.com/search/geocode/v6/forward";
const zoom = 19;

export const MapDraw = ({
  className,
  physicalAddress,
}: {
  className?: string;
  physicalAddress: AddressPhysical;
}) => {
  const appContext = useContext(PotentialContext);
  const appDispatchContext = useContext(PotentialDispatchContext);

  const drawRef = useRef<MapboxDraw>();
  const markerRef = useRef<mapboxgl.Marker>();
  const mapRef = useRef<HTMLDivElement>(null);
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
    appDispatchContext.onChangeCoords([longitude, latitude]);
  }, [physicalAddress]);

  const onDraw = () => {
    if (!drawRef.current) return;
    markerRef.current?.remove();

    const data = drawRef.current.getAll();

    if (data.features.length > 0) {
      const polygons = {
        ...data,
        features: data.features.filter((f) => f.geometry.type === "Polygon"),
      };
      const points = {
        ...data,
        features: data.features.filter((f) => f.geometry.type === "Point"),
      };
      const area = turfArea(polygons);
      appDispatchContext.onChangeSolarPanelArea(area);
      appDispatchContext.onChangeWindTurbineCount(points.features.length);
    }
  };

  const onClearPolygons = () => {
    const polygons = drawRef.current
      ?.getAll()
      .features.filter((f) => f.geometry.type === "Polygon");
    if (polygons) {
      polygons.forEach((p) => drawRef.current?.delete(`${p.id}`));
    }
    appDispatchContext.onChangeSolarPanelArea(0);
  };

  const onClearPoints = () => {
    const points = drawRef.current
      ?.getAll()
      .features.filter((f) => f.geometry.type === "Point");
    if (points) {
      points.forEach((p) => drawRef.current?.delete(`${p.id}`));
    }
    appDispatchContext.onChangeWindTurbineCount(0);
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
      <legend className="absolute top-2 left-2 z-10 flex flex-col gap-y-2">
        <Card className="!p-3 flex items-center">
          <p className="text-sm mr-2">
            <strong>Panel area: </strong>
            {appContext.solarPanelArea?.meters ?? 0} m²
          </p>
          <ClearButton callback={onClearPolygons} />
        </Card>
        <Card className="!p-3 flex items-center">
          <p className="text-sm mr-2">
            <strong>Turbine count: </strong>
            {appContext.windTurbineCount ?? 0}
          </p>
          <ClearButton callback={onClearPoints} />
        </Card>
      </legend>
    </section>
  );
};

const ClearButton = ({ callback }: { callback: () => void }) => (
  <button
    onClick={callback}
    className="text-xs cursor-pointer text-orange-400 ml-auto"
  >
    &#x2715;
  </button>
);
