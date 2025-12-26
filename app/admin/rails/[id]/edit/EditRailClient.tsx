// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { railTypes } from "@/lib/railTypes";
// import {
//   uploadImageToCloud,
//   uploadMultipleImages,
// } from "@/lib/uploadToCloudinary";

// export default function EditRailClient({ id }: { id: string }) {
//   const router = useRouter();

//   const [rail, setRail] = useState<any>(null);
//   const [railName, setRailName] = useState("");
//   const [items, setItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* ------------------------------------------
//      LOAD RAIL
//   ------------------------------------------- */
//   useEffect(() => {
//     async function load() {
//       const res = await fetch(`/api/rails/${id}`);
//       const data = await res.json();

//       setRail(data);
//       setRailName(data.rail_name);
//       setItems(data.rail_items || []);
//       setLoading(false);
//     }
//     load();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (!rail) return <p>Rail not found.</p>;

//   const railPos = Number(rail.rail_pos);

//   if (!railTypes[railPos]) {
//     return <p>❌ Invalid rail_pos: {railPos}</p>;
//   }

//   const itemFields = railTypes[railPos].itemFields;

//   /* ------------------------------------------
//      UPDATE A FIELD IN A PARTICULAR ITEM
//   ------------------------------------------- */
//   const updateItem = (index: number, key: string, value: any) => {
//     setItems((prev) => {
//       const copy = [...prev];
//       copy[index] = { ...(copy[index] || {}), [key]: value };
//       return copy;
//     });
//   };

//   /* ------------------------------------------
//      ADD NEW ITEM
//   ------------------------------------------- */
//   const addItem = () => {
//     const template: any = {};
//     itemFields.forEach((f) => {
//       template[f.name] = f.type === "image-array" ? [] : "";
//     });
//     setItems((prev) => [...prev, template]);
//   };

//   /* ------------------------------------------
//      DELETE ITEM
//   ------------------------------------------- */
//   const deleteItem = (index: number) => {
//     setItems((prev) => prev.filter((_, i) => i !== index));
//   };

//   /* ------------------------------------------
//      SAVE CHANGES
//   ------------------------------------------- */
//   const saveRail = async () => {
//     const sanitized = items.map((item) => {
//       const clean: any = {};
//       for (let k in item) {
//         const v = item[k];
//         if (typeof v === "string" && !v.trim()) continue;
//         if (Array.isArray(v) && v.length === 0) continue;
//         clean[k] = v;
//       }
//       return clean;
//     });

//     const res = await fetch(`/api/rails/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         rail_name: railName,
//         rail_items: sanitized,
//       }),
//     });

//     if (res.ok) {
//       alert("Rail updated successfully!");
//       router.push("/admin/rails");
//     } else {
//       alert("Update failed!");
//     }
//   };

//   /* ------------------------------------------
//      RENDER FIELD COMPONENT
//   ------------------------------------------- */
//   const renderField = (field: any, index: number) => {
//     const value = items[index]?.[field.name];

//     // TEXT
//     if (field.type === "text") {
//       return (
//         <input
//           className="border p-2 w-full"
//           value={value || ""}
//           onChange={(e) => updateItem(index, field.name, e.target.value)}
//         />
//       );
//     }

//     // SINGLE IMAGE UPLOAD
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
//               updateItem(index, field.name, url);
//             }}
//           />

//           {value && (
//             <img
//               src={value}
//               className="w-24 h-24 object-cover rounded mt-2 border shadow"
//             />
//           )}
//         </>
//       );
//     }

//     // MULTIPLE IMAGES
//     if (field.type === "image-array") {
//       return (
//         <>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={async (e) => {
//               const files = Array.from(e.target.files || []);
//               if (!files.length) return;

//               const urls = await uploadMultipleImages(files);
//               updateItem(index, field.name, urls);
//             }}
//           />

//           <div className="grid grid-cols-3 gap-2 mt-2">
//             {value?.map((img: string, i: number) => (
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

//   /* ------------------------------------------
//      UI
//   ------------------------------------------- */
//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Edit Rail</h1>

//       {/* RAIL NAME */}
//       <div className="mb-6">
//         <label className="font-medium">Rail Name</label>
//         <input
//           className="border p-2 w-full"
//           value={railName}
//           onChange={(e) => setRailName(e.target.value)}
//         />
//       </div>

//       {/* ITEM LIST */}
//       <div className="flex justify-between mb-3">
//         <h2 className="text-xl font-semibold">Rail Items</h2>
//         <button
//           className="px-4 py-2 bg-green-600 text-white rounded"
//           onClick={addItem}
//         >
//           + Add Item
//         </button>
//       </div>

//       {items.map((item, index) => (
//         <div key={index} className="border p-4 rounded mb-4 bg-gray-50 shadow">
//           <div className="flex justify-between mb-3">
//             <strong>Item #{index + 1}</strong>

//             <button
//               className="text-red-600"
//               onClick={() => deleteItem(index)}
//             >
//               Delete
//             </button>
//           </div>

//           {/* FIELDS */}
//           {itemFields.map((field: any) => (
//             <div key={field.name} className="mb-4">
//               <label className="font-medium">{field.label}</label>
//               <div className="mt-1">{renderField(field, index)}</div>
//             </div>
//           ))}
//         </div>
//       ))}

//       {/* SAVE BUTTON */}
//       <button
//         className="mt-6 px-6 py-2 bg-black text-white rounded"
//         onClick={saveRail}
//       >
//         Save Changes
//       </button>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { railTypes } from "@/lib/railTypes";
import {
  uploadImageToCloud,
  uploadMultipleImages,
} from "@/lib/uploadToCloudinary";

export default function EditRailClient({ id }: { id: string }) {
  const router = useRouter();

  const [rail, setRail] = useState<any>(null);
  const [railName, setRailName] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ------------------------------------------
     LOAD RAIL
  ------------------------------------------- */
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/rails/${id}`);
      const data = await res.json();

      setRail(data);
      setRailName(data.rail_name);
      setItems(data.rail_items || []);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!rail) return <p>Rail not found.</p>;

  const railPos = Number(rail.rail_pos);

  if (!railTypes[railPos]) {
    return <p>❌ Invalid rail_pos: {railPos}</p>;
  }

  const itemFields = railTypes[railPos].itemFields;

  /* ------------------------------------------
     UPDATE ITEM FIELD (SAFE MERGE)
  ------------------------------------------- */
  const updateItem = (index: number, key: string, value: any) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...(copy[index] || {}), [key]: value };
      return copy;
    });
  };

  /* ------------------------------------------
     ADD NEW ITEM
  ------------------------------------------- */
  const addItem = () => {
    const template: any = {};
    itemFields.forEach((f) => {
      template[f.name] = f.type === "image-array" ? [] : "";
    });
    setItems((prev) => [...prev, template]);
  };

  /* ------------------------------------------
     DELETE ITEM
  ------------------------------------------- */
  const deleteItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  /* ------------------------------------------
     SAVE CHANGES
  ------------------------------------------- */
  const saveRail = async () => {
    const sanitized = items.map((item) => {
      const clean: any = {};
      for (let k in item) {
        const v = item[k];
        if (typeof v === "string" && !v.trim()) continue;
        if (Array.isArray(v) && v.length === 0) continue;
        clean[k] = v;
      }
      return clean;
    });

    const res = await fetch(`/api/rails/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rail_name: railName,
        rail_items: sanitized,
      }),
    });

    if (res.ok) {
      alert("Rail updated successfully!");
      router.push("/admin/rails");
    } else {
      alert("Update failed!");
    }
  };

  /* ------------------------------------------
     RENDER FIELD
  ------------------------------------------- */
  const renderField = (field: any, index: number) => {
    const value = items[index]?.[field.name];

    // TEXT
    if (field.type === "text") {
      return (
        <input
          className="border p-2 w-full"
          value={value || ""}
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
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const url = await uploadImageToCloud(file);
              updateItem(index, field.name, url);
            }}
          />

          {value && (
            <img
              src={value}
              className="w-24 h-24 object-cover rounded mt-2 border shadow"
            />
          )}
        </>
      );
    }

    // ⭐ MULTIPLE IMAGES (FIXED – APPEND MODE)
    if (field.type === "image-array") {
      return (
        <>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={async (e) => {
              const files = Array.from(e.target.files || []);
              if (!files.length) return;

              const urls = await uploadMultipleImages(files);

              updateItem(index, field.name, [
                ...(items[index]?.[field.name] || []),
                ...urls,
              ]);

              // reset input so same image can be uploaded again
              e.target.value = "";
            }}
          />

          <div className="grid grid-cols-3 gap-2 mt-2">
            {(value || []).map((img: string, i: number) => (
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

  /* ------------------------------------------
     UI
  ------------------------------------------- */
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Rail</h1>

      <div className="mb-6">
        <label className="font-medium">Rail Name</label>
        <input
          className="border p-2 w-full"
          value={railName}
          onChange={(e) => setRailName(e.target.value)}
        />
      </div>

      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-semibold">Rail Items</h2>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={addItem}
        >
          + Add Item
        </button>
      </div>

      {items.map((_, index) => (
        <div key={index} className="border p-4 rounded mb-4 bg-gray-50 shadow">
          <div className="flex justify-between mb-3">
            <strong>Item #{index + 1}</strong>
            <button
              className="text-red-600"
              onClick={() => deleteItem(index)}
            >
              Delete
            </button>
          </div>

          {itemFields.map((field: any) => (
            <div key={field.name} className="mb-4">
              <label className="font-medium">{field.label}</label>
              <div className="mt-1">{renderField(field, index)}</div>
            </div>
          ))}
        </div>
      ))}

      <button
        className="mt-6 px-6 py-2 bg-black text-white rounded"
        onClick={saveRail}
      >
        Save Changes
      </button>
    </div>
  );
}
