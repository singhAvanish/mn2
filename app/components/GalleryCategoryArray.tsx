"use client";

import { useState } from "react";

export default function GalleryCategoryArray({ value = [], onChange }) {
  const [categories, setCategories] = useState(value);

  const addCategory = () => {
    const updated = [...categories, { buttonImage: "", images: [] }];
    setCategories(updated);
    onChange(updated);
  };

  const updateCategory = (index, key, val) => {
    const updated = [...categories];
    updated[index][key] = val;
    setCategories(updated);
    onChange(updated);
  };

  const removeCategory = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={addCategory}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        ➕ Add Category
      </button>

      {categories.map((cat, index) => (
        <div key={index} className="border p-4 rounded bg-gray-50">
          {/* HEADER */}
          <div className="flex justify-between">
            <h3 className="font-bold">Category {index + 1}</h3>
            <button
              type="button"
              onClick={() => removeCategory(index)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>

          {/* BUTTON IMAGE */}
          <div className="mt-4">
            <label className="font-medium">Button Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                updateCategory(index, "buttonImage", URL.createObjectURL(e.target.files[0]))
              }
              className="mt-2"
            />

            {cat.buttonImage && (
              <img
                src={cat.buttonImage}
                className="w-24 h-24 rounded mt-2 object-cover"
              />
            )}
          </div>

          {/* SUB IMAGES */}
          <div className="mt-4">
            <label className="font-medium">Category Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const urls = Array.from(e.target.files).map((f) =>
                  URL.createObjectURL(f)
                );
                updateCategory(index, "images", urls);
              }}
              className="mt-2"
            />

            <div className="grid grid-cols-3 gap-2 mt-2">
              {cat.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-20 h-20 rounded object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
