// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { railTypes } from "@/lib/railTypes";
// import {
//   uploadImageToCloud,
//   uploadMultipleImages,
// } from "@/lib/uploadToCloudinary";

// /* ---------- TYPES ---------- */
// interface FieldType {
//   name: string;
//   label: string;
//   type: "text" | "image" | "image-array";
// }

// interface RailTypeConfig {
//   label: string;
//   itemFields: FieldType[];
// }

// interface RailItem {
//   [key: string]: string | string[];
// }

// interface Rail {
//   _id: string;
//   rail_pos: number | string;
//   rail_name: string;
//   rail_items: RailItem[];
// }

// export default function CreateRail() {
//   const router = useRouter();

//   const [existingRails, setExistingRails] = useState<Rail[]>([]);
//   const [railPos, setRailPos] = useState<string>("");
//   const [railName, setRailName] = useState<string>("");
//   const [items, setItems] = useState<RailItem[]>([]);

//   /* ---------------------------
//      Fetch all rails (to prevent duplicates)
//   --------------------------- */
//   useEffect(() => {
//     fetch("/api/rails")
//       .then((res) => res.json())
//       .then((data) => setExistingRails(data));
//   }, []);

//   const railExists = (pos: string) =>
//     existingRails.some((r) => Number(r.rail_pos) === Number(pos));

//   /* ---------------------------
//      When user selects a Rail Type
//   --------------------------- */
//   const handleRailSelect = (pos: string) => {
//     setRailPos(pos);

//     const found = existingRails.find(
//       (r) => Number(r.rail_pos) === Number(pos)
//     );

//     if (found) {
//       alert("Rail already exists — redirecting to edit page.");
//       router.push(`/admin/rails/${found._id}/edit`);
//     }
//   };

//   /* ---------------------------
//      Add new item block
//   --------------------------- */
//   const addItem = () => {
//     const cfg: RailTypeConfig = railTypes[railPos];

//     const template: RailItem = {};
//     cfg.itemFields.forEach((f) => {
//       template[f.name] = f.type === "image-array" ? [] : "";
//     });

//     setItems((prev) => [...prev, template]);
//   };

//   /* ---------------------------
//      Safe Merge Item Update
//   --------------------------- */
//   const updateItem = (index: number, key: string, value: any) => {
//     setItems((prev) => {
//       const updated = [...prev];
//       updated[index] = {
//         ...(updated[index] || {}),
//         [key]: value,
//       };
//       return updated;
//     });
//   };

//   const deleteItem = (index: number) => {
//     setItems((prev) => prev.filter((_, i) => i !== index));
//   };

//   /* ---------------------------
//      Create Rail
//   --------------------------- */
//   const handleSubmit = async () => {
//     const sanitized = items.map((item) => {
//       const clean: RailItem = {};
//       Object.entries(item).forEach(([key, val]) => {
//         if (typeof val === "string" && val.trim() === "") return;
//         if (Array.isArray(val) && val.length === 0) return;
//         clean[key] = val;
//       });
//       return clean;
//     });

//     const payload = {
//       rail_pos: Number(railPos),
//       rail_name: railName,
//       rail_items: sanitized,
//     };

//     const res = await fetch("/api/rails", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (res.ok) {
//       alert("Rail created successfully");
//       router.push("/admin/rails");
//     }
//   };

//   /* ---------------------------
//      FIELD RENDERER
//   --------------------------- */
//   const renderField = (field: FieldType, index: number) => {
//     const value = items[index]?.[field.name];

//     /* TEXT FIELD */
//     if (field.type === "text") {
//       return (
//         <input
//           className="border p-2 w-full"
//           value={value as string}
//           onChange={(e) => updateItem(index, field.name, e.target.value)}
//         />
//       );
//     }

//     /* SINGLE IMAGE UPLOAD */
//     if (field.type === "image") {
//       return (
//         <>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={async (e) => {
//               const file = e.target.files?.[0];
//               if (!file) return;

//               const url = await uploadImageToCloud(file);
//               if (!url) return;

//               updateItem(index, field.name, url);
//             }}
//           />

//           {value && (
//             <img
//               src={value as string}
//               className="w-24 h-24 rounded mt-2 object-cover shadow"
//             />
//           )}
//         </>
//       );
//     }

//     /* MULTIPLE IMAGES */
//     if (field.type === "image-array") {
//       return (
//         <>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={async (e) => {
//               const files = Array.from(e.target.files ?? []) as File[];
//               if (!files.length) return;

//               const urls = await uploadMultipleImages(files);
//               updateItem(index, field.name, urls);
//             }}
//           />

//           <div className="grid grid-cols-3 gap-2 mt-2">
//             {(value as string[])?.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 className="w-20 h-20 object-cover rounded shadow"
//               />
//             ))}
//           </div>
//         </>
//       );
//     }

//     return null;
//   };

//   /* ---------------------------
//      Available Rail Types
//   --------------------------- */
//   const availableRailTypes = Object.keys(railTypes).filter(
//     (pos) => !railExists(pos)
//   );

//   const selectedType = railTypes[railPos as keyof typeof railTypes];

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold">Create Rail</h1>

//       {/* SELECT RAIL TYPE */}
//       <select
//         value={railPos}
//         className="border p-2 w-full mt-4"
//         onChange={(e) => handleRailSelect(e.target.value)}
//       >
//         <option value="">Select Rail Type</option>

//         {availableRailTypes.map((pos) => (
//           <option key={pos} value={pos}>
//             {railTypes[pos].label}
//           </option>
//         ))}
//       </select>

//       {railPos && !railExists(railPos) && selectedType && (
//         <>
//           {/* RAIL NAME */}
//           <div className="mt-4">
//             <label className="font-medium">Rail Name</label>
//             <input
//               className="border p-2 w-full"
//               value={railName}
//               onChange={(e) => setRailName(e.target.value)}
//             />
//           </div>

//           {/* ITEMS */}
//           <div className="flex justify-between mt-6 mb-3">
//             <h2 className="text-xl font-semibold">Items</h2>
//             <button
//               className="bg-green-600 text-white px-3 py-1 rounded"
//               onClick={addItem}
//             >
//               + Add Item
//             </button>
//           </div>

//           {items.map((item, index) => (
//             <div
//               key={index}
//               className="border bg-gray-50 p-4 rounded mb-4 shadow"
//             >
//               <div className="flex justify-between mb-3">
//                 <strong>Item #{index + 1}</strong>
//                 <button
//                   className="text-red-600"
//                   onClick={() => deleteItem(index)}
//                 >
//                   Delete
//                 </button>
//               </div>

//               {selectedType.itemFields.map((field) => (
//                 <div key={field.name} className="mb-4">
//                   <label className="font-medium">{field.label}</label>
//                   {renderField(field, index)}
//                 </div>
//               ))}
//             </div>
//           ))}

//           <button
//             className="mt-6 px-6 py-2 bg-black text-white rounded"
//             onClick={handleSubmit}
//           >
//             Create Rail
//           </button>
//         </>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { railTypes } from "@/lib/railTypes";
import {
  uploadImageToCloud,
  uploadMultipleImages,
} from "@/lib/uploadToCloudinary";

/* ---------- TYPES ---------- */
export interface FieldType {
  name: string;
  label: string;
  type: "text" | "image" | "image-array";
}

export interface RailTypeConfig {
  label: string;
  itemFields: FieldType[];
}

export interface RailItem {
  [key: string]: string | string[];
}

export interface Rail {
  _id: string;
  rail_pos: number;
  rail_name: string;
  rail_items: RailItem[];
}

type RailTypesMap = Record<string, RailTypeConfig>;

type ExistingRail = {
  _id: string;
  rail_pos: number;
  rail_name: string;
  rail_items: RailItem[];
};



export default function CreateRail() {
  const router = useRouter();

  const [existingRails, setExistingRails] = useState<Rail[]>([]);
  const [railPos, setRailPos] = useState<string>("");
  const [railName, setRailName] = useState<string>("");
  const [items, setItems] = useState<RailItem[]>([]);

  /* ---------------------------
     Fetch all rails 
  --------------------------- */
  useEffect(() => {
    fetch("/api/rails")
      .then((res) => res.json())
      .then((data) => setExistingRails(data));
  }, []);

  const railExists = (pos: string) =>
    existingRails.some((r) => Number(r.rail_pos) === Number(pos));

  /* ---------------------------
     When user selects a rail type
  --------------------------- */
  const handleRailSelect = (pos: string) => {
    setRailPos(pos);

    const found = existingRails.find(
      (r: ExistingRail) => Number(r.rail_pos) === Number(pos)
    );

    if (found) {
      alert("Rail already exists — redirecting to edit page.");
      router.push(`/admin/rails/${found._id}/edit`);
    }
  };

  /* ---------------------------
     Add an item
  --------------------------- */
  const addItem = () => {
    const cfg = (railTypes as RailTypesMap)[railPos];

    if (!cfg) return;

    const template: RailItem = {};
    cfg.itemFields.forEach((f) => {
      template[f.name] = f.type === "image-array" ? [] : "";
    });

    setItems((prev) => [...prev, template]);
  };

  /* ---------------------------
     Update item safely
  --------------------------- */
  const updateItem = (index: number, key: string, value: string | string[]) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...(updated[index] ?? {}), [key]: value };
      return updated;
    });
  };

  const deleteItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------------------------
     Submit
  --------------------------- */
  const handleSubmit = async () => {
    const sanitized = items.map((item) => {
      const clean: RailItem = {};
      Object.entries(item).forEach(([key, val]) => {
        if (typeof val === "string" && !val.trim()) return;
        if (Array.isArray(val) && val.length === 0) return;
        clean[key] = val;
      });
      return clean;
    });

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
      alert("Rail created successfully");
      router.push("/admin/rails");
    }
  };

  /* ---------------------------
     Render each field
  --------------------------- */
  const renderField = (field: FieldType, index: number) => {
    const value = items[index]?.[field.name];

    if (field.type === "text") {
      return (
        <input
          className="border p-2 w-full"
          value={(value as string) || ""}
          onChange={(e) => updateItem(index, field.name, e.target.value)}
        />
      );
    }

    if (field.type === "image") {
      return (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = await uploadImageToCloud(file);
              if (url) updateItem(index, field.name, url);
            }}
          />

          {value && (
            <img
              src={value as string}
              className="w-24 h-24 rounded mt-2 object-cover shadow"
            />
          )}
        </>
      );
    }

    if (field.type === "image-array") {
      return (
        <>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={async (e) => {
              const files = Array.from(e.target.files || []) as File[];
              if (!files.length) return;

              const urls = await uploadMultipleImages(files);
              updateItem(index, field.name, urls);
            }}
          />

          <div className="grid grid-cols-3 gap-2 mt-2">
            {(value as string[] | undefined)?.map((img, i) => (
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

    return null;
  };

  const availableRailTypes = Object.keys(railTypes).filter(
    (pos) => !railExists(pos)
  );

  const selectedType = (railTypes as RailTypesMap)[railPos];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Create Rail</h1>

      {/* SELECT TYPE */}
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

      {railPos && !railExists(railPos) && selectedType && (
        <>
          {/* RAIL NAME */}
          <div className="mt-4">
            <label className="font-medium">Rail Name</label>
            <input
              className="border p-2 w-full"
              value={railName}
              onChange={(e) => setRailName(e.target.value)}
            />
          </div>

          {/* ITEMS */}
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
              className="border bg-gray-50 p-4 rounded mb-4 shadow"
            >
              <div className="flex justify-between mb-3">
                <strong>Item #{index + 1}</strong>
                <button
                  className="text-red-600"
                  onClick={() => deleteItem(index)}
                >
                  Delete
                </button>
              </div>

              {selectedType.itemFields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="font-medium">{field.label}</label>
                  {renderField(field, index)}
                </div>
              ))}
            </div>
          ))}

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