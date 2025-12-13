export const railTypes: Record<number, any> = {
  1: {
    label: "Video Rail (heading + videoUrl)",
    // itemFields describe HOW each item looks for this rail
    itemFields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "videoUrl", label: "Video URL", type: "text" }
    ],
  },

  2: {
    label: "Category Rail (buttonImage + images array)",
    itemFields: [
      { name: "buttonImage", label: "Button Image (thumbnail)", type: "image" },
      { name: "images", label: "Category Images (multiple)", type: "image-array" }
    ],
  },

  3: {
    label: "Brands Carousel (logo + name)",
    itemFields: [
      { name: "brandImage", label: "Brand Logo", type: "image" },
      { name: "brandName", label: "Brand Name", type: "text" },
    ]
  },
  4: {
    label: "Brands Carousel (logo + name)",
    itemFields: [
      { name: "brandImage", label: "Brand Logo", type: "image" },
      { name: "brandName", label: "Brand Name", type: "text" },
    ]
  }
  

}
