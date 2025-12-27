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
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: "" });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        // Reset form
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
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-section"
      className="bg-[#f8f8f8] text-[#111] px-4 sm:px-6 md:px-16 lg:px-20 py-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h3 className="text-xs tracking-widest text-gray-500 mb-4 uppercase">
            • Get In Touch
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-[#111] mb-4">
            Let's Create Something
            <br />
            <span className="text-gray-600">Extraordinary Together</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl">
            Whether it's a film project, brand story, or creative collaboration,
            we're here to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.email ? "border-red-400" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.phone ? "border-red-400" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none`}
                  placeholder="+91 9876543210"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company / Brand
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                  placeholder="Your Company Name"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.message ? "border-red-400" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none resize-none`}
                  placeholder="Tell us about your project or inquiry..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Submit Status */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <p className="text-sm font-medium">{submitStatus.message}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <span className="transform group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            {/* Direct Contact */}
            <div>
              <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
                • Direct Contact
              </h4>
              <div className="space-y-4">
                <div className="group">
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <a
                    href="tel:+918652286252"
                    className="text-lg font-medium hover:text-gray-600 transition-colors"
                  >
                    +91 8652286252
                  </a>
                </div>
                <div className="group">
                  <p className="text-sm text-gray-500 mb-1">Alternative</p>
                  <a
                    href="tel:+918652286072"
                    className="text-lg font-medium hover:text-gray-600 transition-colors"
                  >
                    +91 8652286072
                  </a>
                </div>
                <div className="group">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a
                    href="mailto:mangomultimediacompany@gmail.com"
                    className="text-lg font-medium hover:text-gray-600 transition-colors break-all"
                  >
                    mangomultimediacompany@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Office Location */}
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
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-6 text-sm font-medium text-black group"
              >
                Get Directions
                <span className="transform group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </a>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
                • Business Hours
              </h4>
              <div className="space-y-2 text-gray-700">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">10:00 AM - 7:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between text-gray-500">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
                • Follow Our Work
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >
                  <span className="text-xl">in</span>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >
                  <span className="text-xl">◎</span>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >
                  <span className="text-xl">▶</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}