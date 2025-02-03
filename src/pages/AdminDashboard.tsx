import React, { useState } from "react";
import { Plus, Edit, Trash2, LogOut, Video, FileText } from "lucide-react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import type { Event, Sermon, Document } from "../types";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [sermons, setSermons] = React.useState<Sermon[]>([]);
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSermonModal, setShowSermonModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchEvents(), fetchSermons(), fetchDocuments()]);
    setLoading(false);
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast.error("Error loading events");
    } else if (data) {
      setEvents(data);
    }
  };

  const fetchSermons = async () => {
    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast.error("Error loading sermons");
      console.error("Sermons fetch error:", error);
    } else if (data) {
      setSermons(data);
    }
  };

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error loading documents");
      console.error("Documents fetch error:", error);
    } else if (data) {
      setDocuments(data);
    }
  };

  const handleDelete = async (
    type: "event" | "sermon" | "document",
    id: string
  ) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      const { error } = await supabase
        .from(
          type === "event"
            ? "events"
            : type === "sermon"
            ? "sermons"
            : "documents"
        )
        .delete()
        .eq("id", id);

      if (error) {
        toast.error(`Error deleting ${type}`);
        console.error("Delete error:", error);
      } else {
        toast.success(`${type} deleted successfully`);
        fetchAll();
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const dateStr = formData.get("date") as string;
    const date = new Date(dateStr).toISOString();

    const eventData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date,
      location: formData.get("location") as string,
      image_url: (formData.get("imageUrl") as string) || null,
      video_url: (formData.get("videoUrl") as string) || null,
      type: formData.get("type") as "past" | "current" | "future",
    };

    try {
      let error;

      if (editingEvent) {
        const { error: updateError } = await supabase
          .from("events")
          .update(eventData)
          .eq("id", editingEvent.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("events")
          .insert([eventData]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(
        editingEvent
          ? "Event updated successfully"
          : "Event created successfully"
      );
      setShowEventModal(false);
      setEditingEvent(null);
      fetchEvents();
    } catch (error: any) {
      toast.error(error.message || "Error saving event");
      console.error("Event save error:", error);
    }
  };

  const handleSermonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const sermonData = {
        title: formData.get("title") as string,
        speaker: formData.get("speaker") as string,
        date: new Date(formData.get("date") as string).toISOString(),
        duration: formData.get("duration") as string,
        description: formData.get("description") as string,
        video_url: formData.get("videoUrl") as string,
      };

      let error;

      if (editingSermon) {
        const { error: updateError } = await supabase
          .from("sermons")
          .update(sermonData)
          .eq("id", editingSermon.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("sermons")
          .insert([sermonData]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(
        editingSermon
          ? "Sermon updated successfully"
          : "Sermon created successfully"
      );
      setShowSermonModal(false);
      setEditingSermon(null);
      fetchSermons();
    } catch (error: any) {
      console.error("Sermon save error:", error);
      toast.error(error.message || "Error saving sermon");
    }
  };

  const handleDocumentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const documentData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        file_url: formData.get("fileUrl") as string,
        file_type: formData.get("fileType") as string,
        file_size: formData.get("fileSize") as string,
      };

      let error;

      if (editingDocument) {
        const { error: updateError } = await supabase
          .from("documents")
          .update(documentData)
          .eq("id", editingDocument.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("documents")
          .insert([documentData]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(
        editingDocument
          ? "Document updated successfully"
          : "Document created successfully"
      );
      setShowDocumentModal(false);
      setEditingDocument(null);
      fetchDocuments();
    } catch (error: any) {
      console.error("Document save error:", error);
      toast.error(error.message || "Error saving document");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="sermons">Sermons</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowEventModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Event</span>
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingEvent(event);
                            setShowEventModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete("event", event.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sermons">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowSermonModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Sermon</span>
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {sermons.map((sermon) => (
                <div
                  key={sermon.id}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <Video className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-xl font-bold">{sermon.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{sermon.description}</p>
                  <div className="text-sm text-gray-500 space-y-1 mb-4">
                    <p>Speaker: {sermon.speaker}</p>
                    <p>Duration: {sermon.duration}</p>
                    <p>Date: {new Date(sermon.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <a
                      href={sermon.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Watch Sermon
                    </a>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingSermon(sermon);
                          setShowSermonModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete("sermon", sermon.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowDocumentModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Document</span>
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <FileText className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-xl font-bold">{document.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{document.description}</p>
                  <div className="text-sm text-gray-500 space-y-1 mb-4">
                    <p>Type: {document.fileType}</p>
                    <p>Size: {document.fileSize}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <a
                      href={document.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Download Document
                    </a>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingDocument(document);
                          setShowDocumentModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete("document", document.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingEvent ? "Edit Event" : "Add New Event"}
            </h2>
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingEvent?.title}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingEvent?.description}
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  defaultValue={
                    editingEvent?.date
                      ? new Date(editingEvent.date).toISOString().slice(0, 16)
                      : ""
                  }
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={editingEvent?.location}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  defaultValue={editingEvent?.imageUrl}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Video URL
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  defaultValue={editingEvent?.videoUrl}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  name="type"
                  defaultValue={editingEvent?.type || "future"}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="past">Past</option>
                  <option value="current">Current</option>
                  <option value="future">Future</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEventModal(false);
                    setEditingEvent(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingEvent ? "Update" : "Create"} Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sermon Modal */}
      {showSermonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingSermon ? "Edit Sermon" : "Add New Sermon"}
            </h2>
            <form onSubmit={handleSermonSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingSermon?.title}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Speaker
                </label>
                <input
                  type="text"
                  name="speaker"
                  defaultValue={editingSermon?.speaker}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingSermon?.description}
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  defaultValue={
                    editingSermon?.date
                      ? new Date(editingSermon.date).toISOString().slice(0, 16)
                      : ""
                  }
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  defaultValue={editingSermon?.duration}
                  required
                  placeholder="e.g., 45 mins"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Video URL
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  defaultValue={editingSermon?.videoUrl}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowSermonModal(false);
                    setEditingSermon(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingSermon ? "Update" : "Create"} Sermon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Modal */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingDocument ? "Edit Document" : "Add New Document"}
            </h2>
            <form onSubmit={handleDocumentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingDocument?.title}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingDocument?.description}
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  File URL
                </label>
                <input
                  type="url"
                  name="fileUrl"
                  defaultValue={editingDocument?.fileUrl}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  File Type
                </label>
                <input
                  type="text"
                  name="fileType"
                  defaultValue={editingDocument?.fileType}
                  required
                  placeholder="e.g., PDF, DOCX"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  File Size
                </label>
                <input
                  type="text"
                  name="fileSize"
                  defaultValue={editingDocument?.fileSize}
                  required
                  placeholder="e.g., 2.4 MB"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowDocumentModal(false);
                    setEditingDocument(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingDocument ? "Update" : "Create"} Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
