import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Event } from '../types';
import { format } from 'date-fns';

const Events = () => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [activeTab, setActiveTab] = React.useState<'past' | 'current' | 'future'>('current');

  React.useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('type', activeTab)
        .order('date', { ascending: activeTab !== 'past' });
      
      if (data) {
        setEvents(data);
      }
    };

    fetchEvents();
  }, [activeTab]);

  return (
    <div className="space-y-12">
      <section className="relative h-[300px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3"
            alt="Events"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Events</h1>
            <p className="text-xl">
              Join us in our mission activities and events around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Event Tabs */}
      <div className="container mx-auto px-4">
        <div className="flex space-x-4 border-b border-gray-200">
          {(['past', 'current', 'future'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-lg font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
            </button>
          ))}
        </div>

        {/* Event List */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{format(new Date(event.date), 'h:mm a')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {event.videoUrl && (
                  <div className="mt-4">
                    <a
                      href={event.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Watch Event Video
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;