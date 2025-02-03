import React from "react";
import { Heart, CreditCard, Send } from "lucide-react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import type { Volunteer } from "../types";

const VOLUNTEER_UNITS = [
  "Prayer Unit",
  "Kitchen Unit",
  "Choir Unit",
  "Ushering Unit",
  "Children Unit",
  "Media Unit",
  "Welfare Unit",
  "Evangelism Unit",
  "Protocol Unit",
  "Technical Unit",
  "Medical Unit",
  "Transportation Unit",
  "Maintenance Unit",
];

const GetInvolved = () => {
  const [loading, setLoading] = React.useState(false);

  const handleVolunteerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const volunteerData: Partial<Volunteer> = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      unit: formData.get("unit") as string,
      message: formData.get("message") as string,
    };

    try {
      const { error } = await supabase
        .from("volunteers")
        .insert([volunteerData]);

      if (error) throw error;

      toast.success("Thank you for volunteering! We will contact you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3"
            alt="Volunteering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Get Involved</h1>
            <p className="text-xl">
              Join us in spreading the Gospel and making a difference in
              people's lives.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Volunteer Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Heart className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Volunteer</h2>
            </div>
            <form onSubmit={handleVolunteerSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="unit"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Unit
                </label>
                <select
                  id="unit"
                  name="unit"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a unit</option>
                  {VOLUNTEER_UNITS.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>Submit Application</span>
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Donation Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <CreditCard className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Donate</h2>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-lg text-gray-600 mb-8">
                Support our mission work through your generous donations. Your
                contribution helps us reach more people with the Gospel message.
              </p>

              {/* Bank Account Details */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Bank Account Details</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Bank Name:</span> Zenith Bank
                  </p>
                  <p>
                    <span className="font-medium">Account Name:</span> Reachout
                    To All Ministry International
                  </p>
                  <p>
                    <span className="font-medium">Account Number:</span>{" "}
                    1220446780
                  </p>
                  {/* <p>
                    <span className="font-medium">Sort Code:</span> 12-34-56
                  </p> */}
                </div>
              </div>

              {/* Online Payment Button */}
              <button
                onClick={() =>
                  toast.error("Payment gateway integration coming soon!")
                }
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Donate Online</span>
                <CreditCard className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;
