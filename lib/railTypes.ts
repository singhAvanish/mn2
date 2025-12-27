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
      { name: "heading", label: "Heading", type: "text" },
      { name: "buttonImage", label: "Button Image (thumbnail)", type: "image" },
      // {name:"eventName", label:"Event name",type:"text"},
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
    label: "Upcoming Projects",
    itemFields: [
      { name: "projectName", label: "Project Name", type: "text" },
      { name: "coverImage", label: "Cover Image", type: "image" },
      { name: "description", label: "Project Description", type: "text" },
      { name: "images", label: "Gallery Images", type: "image-array" }
    ],
  },
  5: {
    label: "Customer Reviews (Google / Testimonials)",
    itemFields: [
      { name: "userName", label: "User Name", type: "text" },
      { name: "rating", label: "Star Rating (1–5)", type: "text" },
      { name: "review", label: "Review Text", type: "text" },
    ],
  },

}
