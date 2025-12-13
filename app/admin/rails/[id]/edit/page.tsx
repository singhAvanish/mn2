"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { railTypes } from "@/lib/railTypes";
import {
  uploadImageToCloud,
  uploadMultipleImages,
} from "@/lib/uploadToCloudinary";

export default function EditRailPage({ params }) {
  const router = useRouter();
  const { id } = use(params); // Required for Next.js 16 App Router

  const [rail, setRail] = useState(null);
  const [railName, setRailName] = useState("");
  const [items, setItems] = useState([]);

  // Load rail data
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/rails/${id}`);
      const data = await res.json();

      setRail(data);
      setRailName(data.rail_name);
      setItems(data.rail_items || []);
    }
    load();
  }, [id]);

  if (!rail) return <p className="p-6">Loading...</p>;

  const railPos = Number(rail.rail_pos);
  const itemFields = railTypes[railPos].itemFields;

  // ⭐ FIXED safe merge update function
  const updateItem = (index, key, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...(updated[index] || {}),
        [key]: value,
      };
      return updated;
    });
  };

  // Add new item
  const addItem = () => {
    const template = {};
    itemFields.forEach((f) => {
      template[f.name] = f.type === "image-array" ? [] : "";
    });
    setItems((prev) => [...prev, template]);
  };

  // Delete an item
 const deleteItem = async (index) => {
  if (!confirm("Are you sure you want to delete this item?")) return;

  // 1. Delete from DB
  await fetch(`/api/rails/${rail._id}/items/${index}`, {
    method: "DELETE",
  });

  // 2. Remove from React state
  setItems(prev => prev.filter((_, i) => i !== index));
};

  // Save updated rail
  const saveRail = async () => {
    // ⭐ SANITIZE items before saving
    const sanitized = items.map((item) => {
      const clean = {};
      for (const key in item) {
        const val = item[key];

        if (typeof val === "string" && val.trim() === "") continue;
        if (Array.isArray(val) && val.length === 0) continue;

        clean[key] = val;
      }
      return clean;
    });

    console.log("UPDATING DB WITH:", sanitized);

    const payload = {
      rail_name: railName,
      rail_items: sanitized,
    };

    const res = await fetch(`/api/rails/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Rail updated!");
      router.push("/admin/rails");
    } else {
      alert("Update failed");
    }
  };

  // Render a single field type
  const renderField = (field, index) => {
    const value = items[index][field.name];

    // TEXT
    if (field.type === "text") {
      return (
        <input
          className="border p-2 w-full"
          value={value}
          onChange={(e) => updateItem(index, field.name, e.target.value)}
        />
      );
    }

    // SINGLE IMAGE
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
              src={value}
              className="w-24 h-24 rounded object-cover mt-2 shadow"
            />
          )}
        </>
      );
    }

    // MULTIPLE IMAGES
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

          if (urls && urls.length > 0) {
            updateItem(index, field.name, urls);
          }

          // reset file input after upload
          e.target.value = "";
        }}
      />

      <div className="grid grid-cols-3 gap-2 mt-2">
        {value?.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-20 h-20 object-cover rounded shadow"
          />
        ))}
      </div>
    </>
  );
}

  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Rail</h1>

      {/* Rail Name */}
      <div className="mb-6">
        <label className="font-medium">Rail Name</label>
        <input
          className="border p-2 w-full"
          value={railName}
          onChange={(e) => setRailName(e.target.value)}
        />
      </div>

      {/* Item Header */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Rail Items</h2>

        <button
          className="px-3 py-1 bg-green-600 text-white rounded"
          onClick={addItem}
        >
          + Add Item
        </button>
      </div>

      {/* Item List */}
      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded bg-gray-50 shadow-sm"
          >
            <div className="flex justify-between mb-3">
              <h3 className="font-medium">Item #{index + 1}</h3>

              <button
                className="text-red-600"
                onClick={() => deleteItem(index)}
              >
                Delete
              </button>
            </div>

            {itemFields.map((field) => (
              <div key={field.name} className="mb-4">
                <label className="font-medium">{field.label}</label>
                <div className="mt-1">
                  {renderField(field, index)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        className="mt-8 px-6 py-2 bg-black text-white rounded"
        onClick={saveRail}
      >
        Save Changes
      </button>
    </div>
  );
}
