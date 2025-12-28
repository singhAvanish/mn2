// // "use client";

// // import { useState } from "react";

// // interface FormData {
// //   name: string;
// //   email: string;
// //   phone: string;
// //   company: string;
// //   message: string;
// // }

// // interface FormErrors {
// //   [key: string]: string;
// // }

// // export default function ContactUs() {
// //   const [formData, setFormData] = useState<FormData>({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     company: "",
// //     message: "",
// //   });

// //   const [errors, setErrors] = useState<FormErrors>({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [submitStatus, setSubmitStatus] = useState<{
// //     type: "success" | "error" | null;
// //     message: string;
// //   }>({ type: null, message: "" });

// //   const validateForm = (): boolean => {
// //     const newErrors: FormErrors = {};

// //     if (!formData.name.trim() || formData.name.length < 2) {
// //       newErrors.name = "Name must be at least 2 characters";
// //     }

// //     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// //     if (!formData.email.trim() || !emailRegex.test(formData.email)) {
// //       newErrors.email = "Please enter a valid email";
// //     }

// //     if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone)) {
// //       newErrors.phone = "Please enter a valid phone number";
// //     }

// //     if (!formData.message.trim() || formData.message.length < 10) {
// //       newErrors.message = "Message must be at least 10 characters";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //     // Clear error for this field
// //     if (errors[name]) {
// //       setErrors((prev) => ({ ...prev, [name]: "" }));
// //     }
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setSubmitStatus({ type: null, message: "" });

// //     if (!validateForm()) {
// //       return;
// //     }

// //     setIsSubmitting(true);

// //     try {
// //       const response = await fetch("/api/contactus", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setSubmitStatus({
// //           type: "success",
// //           message: data.message || "Message sent successfully!",
// //         });
// //         // Reset form
// //         setFormData({
// //           name: "",
// //           email: "",
// //           phone: "",
// //           company: "",
// //           message: "",
// //         });
// //       } else {
// //         setSubmitStatus({
// //           type: "error",
// //           message: data.error || "Failed to send message. Please try again.",
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Submit error:", error);
// //       setSubmitStatus({
// //         type: "error",
// //         message: "Network error. Please check your connection and try again.",
// //       });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <section
// //       id="contact-section"
// //       className="bg-[#f8f8f8] text-[#111] px-4 sm:px-6 md:px-16 lg:px-20 py-20"
// //     >
// //       <div className="max-w-6xl mx-auto">
// //         {/* Header */}
// //         <div className="mb-16">
// //           <h3 className="text-xs tracking-widest text-gray-500 mb-4 uppercase">
// //             • Get In Touch
// //           </h3>
// //           <h2 className="text-3xl md:text-5xl font-bold text-[#111] mb-4">
// //             Let's Create Something
// //             <br />
// //             <span className="text-gray-600">Extraordinary Together</span>
// //           </h2>
// //           <p className="text-gray-600 text-base md:text-lg max-w-2xl">
// //             Whether it's a film project, brand story, or creative collaboration,
// //             we're here to bring your vision to life.
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
// //           {/* Contact Form */}
// //           <div>
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               {/* Name */}
// //               <div>
// //                 <label
// //                   htmlFor="name"
// //                   className="block text-sm font-medium text-gray-700 mb-2"
// //                 >
// //                   Your Name *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="name"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                   className={`w-full px-4 py-3 bg-white border ${
// //                     errors.name ? "border-red-400" : "border-gray-300"
// //                   } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none`}
// //                   placeholder="John Doe"
// //                 />
// //                 {errors.name && (
// //                   <p className="mt-1 text-sm text-red-600">{errors.name}</p>
// //                 )}
// //               </div>

// //               {/* Email */}
// //               <div>
// //                 <label
// //                   htmlFor="email"
// //                   className="block text-sm font-medium text-gray-700 mb-2"
// //                 >
// //                   Email Address *
// //                 </label>
// //                 <input
// //                   type="email"
// //                   id="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   className={`w-full px-4 py-3 bg-white border ${
// //                     errors.email ? "border-red-400" : "border-gray-300"
// //                   } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none`}
// //                   placeholder="john@example.com"
// //                 />
// //                 {errors.email && (
// //                   <p className="mt-1 text-sm text-red-600">{errors.email}</p>
// //                 )}
// //               </div>

// //               {/* Phone */}
// //               <div>
// //                 <label
// //                   htmlFor="phone"
// //                   className="block text-sm font-medium text-gray-700 mb-2"
// //                 >
// //                   Phone Number
// //                 </label>
// //                 <input
// //                   type="tel"
// //                   id="phone"
// //                   name="phone"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   className={`w-full px-4 py-3 bg-white border ${
// //                     errors.phone ? "border-red-400" : "border-gray-300"
// //                   } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none`}
// //                   placeholder="+91 9876543210"
// //                 />
// //                 {errors.phone && (
// //                   <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
// //                 )}
// //               </div>

// //               {/* Company */}
// //               <div>
// //                 <label
// //                   htmlFor="company"
// //                   className="block text-sm font-medium text-gray-700 mb-2"
// //                 >
// //                   Company / Brand
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="company"
// //                   name="company"
// //                   value={formData.company}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
// //                   placeholder="Your Company Name"
// //                 />
// //               </div>

// //               {/* Message */}
// //               <div>
// //                 <label
// //                   htmlFor="message"
// //                   className="block text-sm font-medium text-gray-700 mb-2"
// //                 >
// //                   Your Message *
// //                 </label>
// //                 <textarea
// //                   id="message"
// //                   name="message"
// //                   value={formData.message}
// //                   onChange={handleChange}
// //                   rows={5}
// //                   className={`w-full px-4 py-3 bg-white border ${
// //                     errors.message ? "border-red-400" : "border-gray-300"
// //                   } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none resize-none`}
// //                   placeholder="Tell us about your project or inquiry..."
// //                 />
// //                 {errors.message && (
// //                   <p className="mt-1 text-sm text-red-600">{errors.message}</p>
// //                 )}
// //               </div>

// //               {/* Submit Status */}
// //               {submitStatus.type && (
// //                 <div
// //                   className={`p-4 rounded-lg ${
// //                     submitStatus.type === "success"
// //                       ? "bg-green-50 text-green-800 border border-green-200"
// //                       : "bg-red-50 text-red-800 border border-red-200"
// //                   }`}
// //                 >
// //                   <p className="text-sm font-medium">{submitStatus.message}</p>
// //                 </div>
// //               )}

// //               {/* Submit Button */}
// //               <button
// //                 type="submit"
// //                 disabled={isSubmitting}
// //                 className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
// //               >
// //                 {isSubmitting ? (
// //                   "Sending..."
// //                 ) : (
// //                   <>
// //                     Send Message
// //                     <span className="transform group-hover:translate-x-2 transition-transform">
// //                       →
// //                     </span>
// //                   </>
// //                 )}
// //               </button>
// //             </form>
// //           </div>

// //                <div>
// //         <h3 className="text-xs tracking-widest text-gray-500 mb-12 uppercase">
// //           • Our Founders
// //         </h3>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
// //           {/* Founder 1 */}
// //           <div className="group">
// //             <div className="overflow-hidden rounded-xl shadow-lg">
// //               <img
// //                 src="/mantoo.jpg"
// //                 alt="Mantu Kumar Bhatia"
// //                 className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover object-top transition duration-700 group-hover:scale-105"
// //               />
// //             </div>
// //             <h4 className="mt-6 text-xl font-semibold">
// //               Mantu Kumar Bhatia
// //             </h4>
// //             <p className="text-sm text-gray-600 mt-2">
// //               Co-Founder & Managing Director
// //             </p>
// //           </div>

// //           {/* Founder 2 */}
// //           <div className="group">
// //             <div className="overflow-hidden rounded-xl shadow-lg">
// //               <img
// //                 src="/arvind.jpg"
// //                 alt="Arvind Chauhan"
// //                 className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover object-top transition duration-700 group-hover:scale-105"
// //               />
// //             </div>
// //             <h4 className="mt-6 text-xl font-semibold">
// //               Arvind Chauhan
// //             </h4>
// //             <p className="text-sm text-gray-600 mt-2">
// //               Co-Founder & Creative Director
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //           {/* Contact Info */}
// //           <div className="space-y-12">
// //             {/* Direct Contact */}
// //             <div>
// //               <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
// //                 • Direct Contact
// //               </h4>
// //               <div className="space-y-4">
// //                 <div className="group">
// //                   <p className="text-sm text-gray-500 mb-1">Phone</p>
// //                   <a
// //                     href="tel:+918652286252"
// //                     className="text-lg font-medium hover:text-gray-600 transition-colors"
// //                   >
// //                     +91 8652286252
// //                   </a>
// //                 </div>
// //                 <div className="group">
// //                   <p className="text-sm text-gray-500 mb-1">Alternative</p>
// //                   <a
// //                     href="tel:+918652286072"
// //                     className="text-lg font-medium hover:text-gray-600 transition-colors"
// //                   >
// //                     +91 8652286072
// //                   </a>
// //                 </div>
// //                 <div className="group">
// //                   <p className="text-sm text-gray-500 mb-1">Email</p>
// //                   <a
// //                     href="mailto:mangomultimediacompany@gmail.com"
// //                     className="text-lg font-medium hover:text-gray-600 transition-colors break-all"
// //                   >
// //                     mangomultimediacompany@gmail.com
// //                   </a>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Office Location */}
// //             <div>
// //               <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
// //                 • Visit Our Studio
// //               </h4>
// //               <address className="not-italic text-gray-700 leading-relaxed">
// //                 Mango Multimedia Company
// //                 <br />
// //                 GR 01, Aasra Building,
// //                 <br />
// //                 Gulmohar Lane, Chunabhatti,
// //                 <br />
// //                 Mumbai, Maharashtra 400022
// //                 <br />
// //                 India
// //               </address>
// //               <a
// //                 href="https://maps.google.com/?q=GR+01+Aasra+Building+Gulmohar+Lane+Chunabhatti+Mumbai"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="inline-flex items-center gap-3 mt-6 text-sm font-medium text-black group"
// //               >
// //                 Get Directions
// //                 <span className="transform group-hover:translate-x-2 transition-transform">
// //                   →
// //                 </span>
// //               </a>
// //             </div>

// //             {/* Business Hours */}
// //             <div>
// //               <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
// //                 • Business Hours
// //               </h4>
// //               <div className="space-y-2 text-gray-700">
// //                 <p className="flex justify-between">
// //                   <span>Monday - Friday:</span>
// //                   <span className="font-medium">10:00 AM - 7:00 PM</span>
// //                 </p>
// //                 <p className="flex justify-between">
// //                   <span>Saturday:</span>
// //                   <span className="font-medium">10:00 AM - 4:00 PM</span>
// //                 </p>
// //                 <p className="flex justify-between text-gray-500">
// //                   <span>Sunday:</span>
// //                   <span>Closed</span>
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Social Links */}
// //             <div>
// //               <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
// //                 • Follow Our Work
// //               </h4>
// //               <div className="flex gap-4">
// //                 <a
// //                   href="#"
// //                   className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
// //                 >
// //                   <span className="text-xl">in</span>
// //                 </a>
// //                 <a
// //                   href="#"
// //                   className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
// //                 >
// //                   <span className="text-xl">◎</span>
// //                 </a>
// //                 <a
// //                   href="#"
// //                   className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
// //                 >
// //                   <span className="text-xl">▶</span>
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { useState } from "react";

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   company: string;
//   message: string;
// }

// interface FormErrors {
//   [key: string]: string;
// }

// export default function ContactUs() {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     company: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<{
//     type: "success" | "error" | null;
//     message: string;
//   }>({ type: null, message: "" });

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};

//     if (!formData.name.trim() || formData.name.length < 2) {
//       newErrors.name = "Name must be at least 2 characters";
//     }

//     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (!formData.email.trim() || !emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//     }

//     if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone)) {
//       newErrors.phone = "Please enter a valid phone number";
//     }

//     if (!formData.message.trim() || formData.message.length < 10) {
//       newErrors.message = "Message must be at least 10 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitStatus({ type: null, message: "" });

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await fetch("/api/contactus", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSubmitStatus({
//           type: "success",
//           message: data.message || "Message sent successfully!",
//         });
//         // Reset form
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           company: "",
//           message: "",
//         });
//       } else {
//         setSubmitStatus({
//           type: "error",
//           message: data.error || "Failed to send message. Please try again.",
//         });
//       }
//     } catch (error) {
//       console.error("Submit error:", error);
//       setSubmitStatus({
//         type: "error",
//         message: "Network error. Please check your connection and try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section
//       id="contact-section"
//       className="bg-[#f8f8f8] text-[#111] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Header - CENTERED */}
//         <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
//           <h3 className="text-xs tracking-widest text-gray-500 mb-3 sm:mb-4 uppercase">
//             • Get In Touch
//           </h3>
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111] mb-4 sm:mb-6">
//             Let's Create Something
//             <br />
//             <span className="text-gray-600">Extraordinary Together</span>
//           </h2>
//           <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
//             Whether it's a film project, brand story, or creative collaboration,
//             we're here to bring your vision to life.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
//           {/* Contact Form */}
//           <div>
//             <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//               {/* Name */}
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
//                 >
//                   Your Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border ${
//                     errors.name ? "border-red-400" : "border-gray-300"
//                   } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none`}
//                   placeholder="John Doe"
//                 />
//                 {errors.name && (
//                   <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
//                 >
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border ${
//                     errors.email ? "border-red-400" : "border-gray-300"
//                   } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none`}
//                   placeholder="john@example.com"
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>

//               {/* Two column layout for phone and company on desktop */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                 {/* Phone */}
//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
//                   >
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border ${
//                       errors.phone ? "border-red-400" : "border-gray-300"
//                     } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none`}
//                     placeholder="+91 9876543210"
//                   />
//                   {errors.phone && (
//                     <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phone}</p>
//                   )}
//                 </div>

//                 {/* Company */}
//                 <div>
//                   <label
//                     htmlFor="company"
//                     className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
//                   >
//                     Company / Brand
//                   </label>
//                   <input
//                     type="text"
//                     id="company"
//                     name="company"
//                     value={formData.company}
//                     onChange={handleChange}
//                     className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
//                     placeholder="Your Company Name"
//                   />
//                 </div>
//               </div>

//               {/* Message */}
//               <div>
//                 <label
//                   htmlFor="message"
//                   className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
//                 >
//                   Your Message *
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows={4}
//                   className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border ${
//                     errors.message ? "border-red-400" : "border-gray-300"
//                   } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none resize-none`}
//                   placeholder="Tell us about your project or inquiry..."
//                 />
//                 {errors.message && (
//                   <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.message}</p>
//                 )}
//               </div>

//               {/* Submit Status */}
//               {submitStatus.type && (
//                 <div
//                   className={`p-3 sm:p-4 rounded-lg ${
//                     submitStatus.type === "success"
//                       ? "bg-green-50 text-green-800 border border-green-200"
//                       : "bg-red-50 text-red-800 border border-red-200"
//                   }`}
//                 >
//                   <p className="text-xs sm:text-sm font-medium">{submitStatus.message}</p>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-black text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed group flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
//               >
//                 {isSubmitting ? (
//                   "Sending..."
//                 ) : (
//                   <>
//                     Send Message
//                     <span className="transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform">
//                       →
//                     </span>
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>

//           {/* Right Column - Founders Only */}
//           <div className="space-y-8 sm:space-y-12">
//             {/* Founders Section */}
//             <div>
//               <h3 className="text-xs tracking-widest text-gray-500 mb-6 sm:mb-8 uppercase">
//                 • Our Founders
//               </h3>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
//                 {/* Founder 1 */}
//                 <div className="group">
//                   <div className="overflow-hidden rounded-xl shadow-lg">
//                     <img
//                       src="/mantoo.jpg"
//                       alt="Mantu Kumar Bhatia"
//                       className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover object-top transition duration-700 group-hover:scale-105"
//                     />
//                   </div>
//                   <h4 className="mt-6 text-xl font-semibold text-center sm:text-left">
//                     Mantu Kumar Bhatia
//                   </h4>
//                   <p className="text-sm text-gray-600 mt-2 text-center sm:text-left">
//                     Co-Founder & Managing Director
//                   </p>
//                 </div>

//                 {/* Founder 2 */}
//                 <div className="group">
//                   <div className="overflow-hidden rounded-xl shadow-lg">
//                     <img
//                       src="/arvind.jpg"
//                       alt="Arvind Chauhan"
//                       className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover object-top transition duration-700 group-hover:scale-105"
//                     />
//                   </div>
//                   <h4 className="mt-6 text-xl font-semibold text-center sm:text-left">
//                     Arvind Chauhan
//                   </h4>
//                   <p className="text-sm text-gray-600 mt-2 text-center sm:text-left">
//                     Co-Founder & Creative Director
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Details Section - Full width below founders */}
//         <div id="about-section" className="mt-12 sm:mt-16 lg:mt-20">
//           <div className="bg-white p-6 sm:p-8 lg:p-12 rounded-xl sm:rounded-2xl shadow-lg">
//             <h3 className="text-2xl sm:text-3xl font-bold text-[#111] mb-8 sm:mb-12 text-center">
//               Get In Touch With Us
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
//               {/* Contact Information */}
//               <div>
//                 <h4 className="text-xs tracking-widest text-gray-500 mb-4 sm:mb-6 uppercase">
//                   • Direct Contact
//                 </h4>
//                 <div className="space-y-4 sm:space-y-5">
//                   <div>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-1">Phone</p>
//                     <a
//                       href="tel:+918652286252"
//                       className="text-base sm:text-lg font-medium text-[#111] hover:text-gray-600 transition-colors block"
//                     >
//                       +91 8652286252
//                     </a>
//                   </div>
//                   <div>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-1">Alternative</p>
//                     <a
//                       href="tel:+918652286072"
//                       className="text-base sm:text-lg font-medium text-[#111] hover:text-gray-600 transition-colors block"
//                     >
//                       +91 8652286072
//                     </a>
//                   </div>
//                   <div>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-1">Email</p>
//                     <a
//                       href="mailto:mangomultimediacompany@gmail.com"
//                       className="text-sm sm:text-base font-medium text-[#111] hover:text-gray-600 transition-colors block break-all"
//                     >
//                       mangomultimediacompany@gmail.com
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* Office Location */}
//               <div>
//                 <h4 className="text-xs tracking-widest text-gray-500 mb-4 sm:mb-6 uppercase">
//                   • Visit Our Studio
//                 </h4>
//                 <address className="not-italic text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
//                   Mango Multimedia Company
//                   <br />
//                   GR 01, Aasra Building,
//                   <br />
//                   Gulmohar Lane, Chunabhatti,
//                   <br />
//                   Mumbai, Maharashtra 400022
//                   <br />
//                   India
//                 </address>
//                 <a
//                   href="https://maps.google.com/?q=GR+01+Aasra+Building+Gulmohar+Lane+Chunabhatti+Mumbai"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 sm:gap-3 text-sm font-medium text-black group"
//                 >
//                   Get Directions
//                   <span className="transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform">
//                     →
//                   </span>
//                 </a>
//               </div>

//               {/* Business Hours */}
//               <div>
//                 <h4 className="text-xs tracking-widest text-gray-500 mb-4 sm:mb-6 uppercase">
//                   • Business Hours
//                 </h4>
//                 <div className="space-y-3 text-gray-700 text-sm sm:text-base">
//                   <div className="flex justify-between items-center">
//                     <span>Monday - Friday:</span>
//                     <span className="font-medium">10 AM - 7 PM</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Saturday:</span>
//                     <span className="font-medium">10 AM - 4 PM</span>
//                   </div>
//                   <div className="flex justify-between items-center text-gray-500">
//                     <span>Sunday:</span>
//                     <span>Closed</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Social Links */}
//               <div>
//                 <h4 className="text-xs tracking-widest text-gray-500 mb-4 sm:mb-6 uppercase">
//                   • Follow Our Work
//                 </h4>
//                 <div className="flex flex-col gap-4">
//                   <div className="flex gap-3 sm:gap-4">
//                     <a
//                       href="#"
//                       className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
//                       aria-label="LinkedIn"
//                     >
//                       <span className="text-sm sm:text-base">in</span>
//                     </a>
//                     <a
//                       href="#"
//                       className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
//                       aria-label="Instagram"
//                     >
//                       <span className="text-sm sm:text-base">◎</span>
//                     </a>
//                     <a
//                       href="#"
//                       className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
//                       aria-label="YouTube"
//                     >
//                       <span className="text-sm sm:text-base">▶</span>
//                     </a>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-2">
//                     Connect with us on social media for updates and insights
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Divider Line */}
//             <div className="mt-10 sm:mt-12 pt-10 sm:pt-12 border-t border-gray-200">
//               <div className="text-center">
//                 <p className="text-sm sm:text-base text-gray-600">
//                   We typically respond to inquiries within 24 hours during business days
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Looking forward to collaborating with you!
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  /* ================= LOGIC (UNCHANGED) ================= */

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: "" });

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contactus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= UI ================= */

  return (
    <section
      id="contact-section"
      className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-[#111] px-4 sm:px-6 lg:px-10 py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14 sm:mb-20">
          <h3 className="text-xs tracking-widest text-gray-500 mb-4 uppercase">
            • Get In Touch
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Let's Create Something
            <br />
            <span className="text-gray-600">Extraordinary Together</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether it's a film project, brand story, or creative collaboration,
            we're here to bring your vision to life.
          </p>
        </div>

        {/* FORM + FOUNDERS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* FORM */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                ["name", "Your Name *"],
                ["email", "Email Address *"],
                ["phone", "Phone Number"],
                ["company", "Company / Brand"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-2">
                    {label}
                  </label>
                  <input
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[field] ? "border-red-400" : "border-gray-300"
                    } focus:ring-2 focus:ring-black outline-none`}
                  />
                  {errors[field] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? "border-red-400" : "border-gray-300"
                  } focus:ring-2 focus:ring-black outline-none resize-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>

          {/* FOUNDERS */}
          <div>
            <h3 className="text-xs tracking-widest text-gray-500 mb-8 uppercase">
              • Our Founders
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Founder 1 */}
              <div>
                <img
                  src="/mantoo.jpg"
                  alt="Mantu Kumar Bhatia"
                  className="w-full h-[380px] object-cover object-top rounded-xl shadow-lg"
                />
                <h4 className="mt-4 text-xl font-semibold">
                  Mantu Kumar Bhatia
                </h4>
                <p className="text-sm text-gray-600">
                  Co-Founder & Managing Director
                </p>
              </div>

              {/* Founder 2 */}
              <div>
                <img
                  src="/arvind.jpg"
                  alt="Arvind Chauhan"
                  className="w-full h-[380px] object-cover object-top rounded-xl shadow-lg"
                />
                <h4 className="mt-4 text-xl font-semibold">
                  Arvind Chauhan
                </h4>
                <p className="text-sm text-gray-600">
                  Co-Founder & Creative Director
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT DETAILS */}
        <div
          id="about-section"
          className="mt-16 bg-white rounded-3xl shadow-xl border border-gray-200 p-8 sm:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Direct Contact */}
            <div>
              <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
                • Direct Contact
              </h4>
              <p className="font-medium">+91 8652286252</p>
              <p className="font-medium">+91 8652286072</p>
              <p className="mt-2 break-all">
                mangomultimediacompany@gmail.com
              </p>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
                • Visit Our Studio
              </h4>
              <address className="not-italic text-gray-700 leading-relaxed">
                Mango Multimedia Company
                <br />
                GR 01, Aasra Building,
                <br />
                Gulmohar Lane, Chunabhatti,
                <br />
                Mumbai, Maharashtra 400022
                <br />
                India
              </address>
              <a
                href="https://maps.google.com/?q=GR+01+Aasra+Building+Gulmohar+Lane+Chunabhatti+Mumbai"
                target="_blank"
                className="inline-block mt-4 font-medium"
              >
                Get Directions →
              </a>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
                • Business Hours
              </h4>
              <p>Monday – Friday: 10:00 AM – 7:00 PM</p>
              <p>Saturday: 10:00 AM – 4:00 PM</p>
              <p className="text-gray-500">Sunday: Closed</p>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
                • Follow Our Work
              </h4>
              <div className="flex gap-4">
                <div className="w-12 h-12 border rounded-lg flex items-center justify-center">
                  in
                </div>
                <div className="w-12 h-12 border rounded-lg flex items-center justify-center">
                  ◎
                </div>
                <div className="w-12 h-12 border rounded-lg flex items-center justify-center">
                  ▶
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-gray-500">
            We typically respond within 24 hours during business days.
          </div>
        </div>
      </div>
    </section>
  );
}
