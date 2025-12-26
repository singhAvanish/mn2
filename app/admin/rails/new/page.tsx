"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { railTypes } from "@/lib/railTypes";
import {
  uploadImageToCloud,
  uploadMultipleImages,
} from "@/lib/uploadToCloudinary";

// Type definitions
type RailItem = {
  [key: string]: string | string[];
};

type ExistingRail = {
  _id: string;
  rail_pos: number;
  rail_name: string;
  rail_items: RailItem[];
};

type FieldType = {
  name: string;
  label: string;
  type: "text" | "image" | "image-array";
};

export default function CreateRail() {
  const router = useRouter();

  const [existingRails, setExistingRails] = useState<ExistingRail[]>([]);
  const [railPos, setRailPos] = useState("");
  const [railName, setRailName] = useState("");
  const [items, setItems] = useState<RailItem[]>([]);

  // Fetch rails
  useEffect(() => {
    fetch("/api/rails")
      .then((res) => res.json())
      .then((data) => setExistingRails(data));
  }, []);

  // Check if a rail of same position already exists
  const railExists = (pos: string | number) =>
    existingRails.some((r: ExistingRail) => Number(r.rail_pos) === Number(pos));

  // When a rail type is selected
  const handleRailSelect = (pos: string) => {
    setRailPos(pos);

    const found = existingRails.find(
      (r: ExistingRail) => Number(r.rail_pos) === Number(pos)
    );

    if (found) {
      alert("Rail already exists. Redirecting to edit.");
      router.push(`/admin/rails/${found._id}/edit`);
    }
  };

  // Add item block
  const addItem = () => {
    const template: RailItem = {};
    railTypes[Number(railPos)].itemFields.forEach((f: FieldType) => {
      template[f.name] = f.type === "image-array" ? [] : "";
    });
    setItems((prev) => [...prev, template]);
  };

  // ⭐ FIXED: Safe, merge-based updateItem
  const updateItem = (index: number, key: string, value: string | string[]) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...(updated[index] || {}),
        [key]: value,
      };
      return updated;
    });
  };

  // Delete item
  const deleteItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async () => {
    console.log("ITEMS BEFORE SANITIZE:", items);

    // ⭐ SANITIZE DATA: remove empty strings, empty arrays
    const sanitized = items.map((item) => {
      const clean: RailItem = {};
      for (const key in item) {
        const val = item[key];

        if (typeof val === "string" && val.trim() === "") continue;
        if (Array.isArray(val) && val.length === 0) continue;

        clean[key] = val;
      }
      return clean;
    });

    console.log("SENDING TO DB:", sanitized);

    const payload = {
      rail_pos: Number(railPos),
      rail_name: railName,
      rail_items: sanitized,
    };

    const res = await fetch("/api/rails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Rail created");
      router.push("/admin/rails");
    }
  };

  // Render a field
  const renderField = (field: FieldType, index: number) => {
    const value = items[index][field.name];

    // Text Input
    if (field.type === "text") {
      return (
        <input
          className="border p-2 w-full"
          value={value as string}
          onChange={(e) => updateItem(index, field.name, e.target.value)}
        />
      );
    }

    // Single Image Upload
    if (field.type === "image") {
      return (
        <>
          <input
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const url = await uploadImageToCloud(file);

              if (!url) return;

              updateItem(index, field.name, url);
            }}
          />

          {value && (
            <img
              src={value as string}
              className="w-24 h-24 mt-2 rounded object-cover shadow"
              alt="Preview"
            />
          )}
        </>
      );
    }

    // Multiple Images Upload
    if (field.type === "image-array") {
      return (
        <>
          <input
            type="file"
            multiple
            onChange={async (e) => {
              const files = Array.from(e.target.files || []);
              if (files.length === 0) return;

              const urls = await uploadMultipleImages(files);

              if (urls.length > 0) {
                updateItem(index, field.name, urls);
              }
            }}
          />

          <div className="grid grid-cols-3 gap-2 mt-2">
            {(value as string[])?.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-20 h-20 rounded object-cover shadow"
                alt={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      );
    }
  };

  const availableRailTypes = Object.keys(railTypes).filter(
    (pos) => !railExists(pos)
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Create Rail</h1>

      {/* Rail type selection */}
      <select
        value={railPos}
        className="border p-2 w-full mt-4"
        onChange={(e) => handleRailSelect(e.target.value)}
      >
        <option value="">Select Rail Type</option>

        {availableRailTypes.map((pos) => (
          <option key={pos} value={pos}>
            {railTypes[Number(pos)].label}
          </option>
        ))}
      </select>

      {/* If rail not created already */}
      {railPos && !railExists(railPos) && (
        <>
          {/* Rail Name */}
          <div className="mt-4">
            <label className="font-medium">Rail Name</label>
            <input
              className="border p-2 w-full"
              value={railName}
              onChange={(e) => setRailName(e.target.value)}
            />
          </div>

          {/* Items */}
          <div className="flex justify-between mt-6 mb-3">
            <h2 className="text-xl font-semibold">Items</h2>
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={addItem}
            >
              + Add Item
            </button>
          </div>

          {items.map((item, index) => (
            <div
              key={index}
              className="border p-4 mb-4 bg-gray-50 rounded shadow"
            >
              <div className="flex justify-between mb-2">
                <strong>Item #{index + 1}</strong>

                <button
                  className="text-red-600"
                  onClick={() => deleteItem(index)}
                >
                  Delete
                </button>
              </div>

              {railTypes[Number(railPos)].itemFields.map((field: FieldType) => (
                <div key={field.name} className="mb-4">
                  <label className="font-medium">{field.label}</label>
                  {renderField(field, index)}
                </div>
              ))}
            </div>
          ))}

          {/* Submit */}
          <button
            className="mt-6 px-6 py-2 bg-black text-white rounded"
            onClick={handleSubmit}
          >
            Create Rail
          </button>
        </>
      )}
    </div>
  );
}