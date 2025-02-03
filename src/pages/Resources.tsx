import React from 'react';
import {  Video, FileText, Download, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Sermon, Document } from '../types';
import { format } from 'date-fns';

const Resources = () => {
  const [sermons, setSermons] = React.useState<Sermon[]>([]);
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const [sermonsRes, documentsRes] = await Promise.all([
          supabase.from('sermons').select('*').order('date', { ascending: false }),
          supabase.from('documents').select('*').order('created_at', { ascending: false })
        ]);

        if (sermonsRes.error) throw sermonsRes.error;
        if (documentsRes.error) throw documentsRes.error;

        setSermons(sermonsRes.data?.map(sermon => ({
          ...sermon,
          videoUrl: sermon.video_url,
          imageUrl: sermon.image_url || 'https://images.unsplash.com/photo-1616627577385-5c0c4dab0257?ixlib=rb-4.0.3',
        })) || []);
        
        setDocuments(documentsRes.data?.map(doc => ({
          ...doc,
          fileUrl: doc.file_url,
          fileType: doc.file_type,
          fileSize: doc.file_size,
          imageUrl: doc.image_url || 'https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3',
        })) || []);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleDownload = (doc: Document) => {
    window.open(doc.fileUrl, '_blank');
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[300px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3"
            alt="Resources"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Resources</h1>
            <p className="text-xl">
              Access our collection of sermons, podcasts, and spiritual materials.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Sermons */}
            <section className="mb-16">
              <div className="flex items-center space-x-2 mb-8">
                <Video className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold">Sermons</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {sermons.length === 0 ? (
                  <p className="text-gray-500 col-span-2 text-center py-8">No sermons available yet.</p>
                ) : (
                  sermons.map((sermon) => (
                    <div key={sermon.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={sermon.imageUrl}
                          alt={sermon.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-2">{sermon.title}</h3>
                          <p className="text-white/80">By {sermon.speaker}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-gray-600 space-y-1 mb-4">
                          <p>Date: {format(new Date(sermon.date), 'MMMM d, yyyy')}</p>
                          <p>Duration: {sermon.duration}</p>
                        </div>
                        <p className="text-gray-600 mb-4">{sermon.description}</p>
                        
                        {/* Watch/Listen Button */}
                        <a
                          href={sermon.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Video className="h-5 w-5 mr-2" />
                          Watch Sermon
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Documents */}
            <section>
              <div className="flex items-center space-x-2 mb-8">
                <FileText className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold">Documents</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {documents.length === 0 ? (
                  <p className="text-gray-500 col-span-2 text-center py-8">No documents available yet.</p>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={doc.imageUrl}
                          alt={doc.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white">{doc.title}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 mb-4">{doc.description}</p>
                        <div className="text-sm text-gray-500 space-y-1 mb-4">
                          <p>Type: {doc.fileType}</p>
                          <p>Size: {doc.fileSize}</p>
                        </div>
                        
                        {/* Download Button */}
                        <button
                          onClick={() => handleDownload(doc)}
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Download className="h-5 w-5 mr-2" />
                          Download {doc.fileType.toUpperCase()}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Resources;