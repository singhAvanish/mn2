"use client";

import { useState } from "react";
import { railTypes } from "@/lib/railTypes";
import { useRouter } from "next/navigation";

export default function CreateRail() {
  const router = useRouter();

  const [railPos, setRailPos] = useState("");
  const [railName, setRailName] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    const pos = Number(railPos);
    const template = {};

    railTypes[pos].itemFields.forEach((f) => {
      template[f.name] = f.type === "image-array" ? [] : "";
    });

    setItems((prev) => [...prev, template]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      rail_pos: Number(railPos),
      rail_name: railName,
      rail_items: items,
    };

    const res = await fetch("/api/rails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Rail created successfully!");
      router.push("/admin/rails");
    } else {
      alert("Failed to create rail.");
    }
  };

  const renderField = (field, index) => {
    const val = items[index][field.name];

    if (field.type === "text") {
      return (
        <input
          type="text"
          className="border p-2 w-full"
          value={val}
          onChange={(e) => updateItem(index, field.name, e.target.value)}
        />
      );
    }

    if (field.type === "image") {
      return (
        <>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = URL.createObjectURL(file);
              updateItem(index, field.name, url);
            }}
          />
          {val && <img src={val} className="w-24 h-24 mt-2" />}
        </>
      );
    }

    if (field.type === "image-array") {
      return (
        <>
          <input
            type="file"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;
              const arr = Array.from(files).map((f) => URL.createObjectURL(f));
              updateItem(index, field.name, arr);
            }}
          />
          <div className="grid grid-cols-3 gap-2 mt-2">
            {val?.map((img, i) => (
              <img key={i} src={img} className="w-20 h-20 object-cover" />
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Rail (with items)</h1>

      {/* SELECT RAIL TYPE */}
      <label className="font-medium">Rail Type</label>
      <select
        className="border p-2 w-full mt-2"
        value={railPos}
        onChange={(e) => {
          setRailPos(e.target.value);
          setItems([]);
        }}
      >
        <option value="">Select Type</option>
        {Object.keys(railTypes).map((k) => (
          <option key={k} value={k}>
            {railTypes[k].label}
          </option>
        ))}
      </select>

      {/* RAIL NAME */}
      {railPos && (
        <>
          <div className="mt-4">
            <label className="font-medium">Rail Name</label>
            <input
              className="border p-2 w-full mt-1"
              value={railName}
              onChange={(e) => setRailName(e.target.value)}
            />
          </div>

          {/* ITEMS */}
          <div className="mt-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Items</h2>

              <button
                type="button"
                onClick={addItem}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                ➕ Add Item
              </button>
            </div>

            <div className="mt-4 space-y-6">
              {items.map((item, index) => (
                <div key={index} className="border p-4 rounded bg-gray-50">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">Item #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>

                  {railTypes[railPos].itemFields.map((field) => (
                    <div key={field.name} className="mt-3">
                      <label className="font-medium">{field.label}</label>
                      <div className="mt-1">{renderField(field, index)}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 px-4 py-2 bg-black text-white rounded"
            >
              Create Rail
            </button>
          </div>
        </>
      )}
    </div>
  );
}
