import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [soulCount, setSoulCount] = React.useState(0);

  React.useEffect(() => {
    const fetchSoulCount = async () => {
      const { data } = await supabase
        .from('soul_count')
        .select('count')
        .single();
      if (data) {
        setSoulCount(data.count);
      }
    };

    fetchSoulCount();
  }, []);

  const title = "From the Coordinator’s Desk";
  const introduction = "Beloved,";
  const message = `
    Welcome on board, at Reachout To All, every soul matters to us because we know 
    each means a lot to God who made us all. Diverse people represent a variety of 
    needs ranging from salvation, medical care, welfare materials, and deliverance 
    among others. Love is a universal need for which humanity is a global language 
    used to meet these needs.
  `;
  const items = [
    {
      text: "We are a group of believers from diverse denominations, united by a passion for missions. Our aim is to reach out to people everywhere, enabling their salvation, rededication, commitment, rounded development, and discipleship, so that they may become effective tools in God's hands and have better lives. We achieve this by prayerfully seeking and visiting mission fields, partnering with organizations and agencies to make our deliverables possible.",
    },
    {
      text: "God continues to save souls in unprecedented ways, according to His divine agenda of ensuring that no life perishes and that all may be saved (2 Peter 3:9). We are both privileged witnesses and channels of this heaven-ordained move of God across various tribes and languages, rekindling the body of Christ with urgency towards fulfilling the Great Commission as a means to hasten His return (Matthew 24:14).",
    },
    {
      text: "We believe that God has ushered in a season of double harvest – a redoubling of efforts in soul-winning that has led to an increase in converts initially and, ultimately, disciples who populate God’s kingdom.",
    },
    {
      text: "God’s business remains mission work and so does ours, as we belong to Him. There can never be a second chance to harvest ripe souls. Among the things that will endure in heaven is the number of souls we have led to Jesus and touched positively.",
    },
  ];
  const closing = `
    You can join on board to touch lives in every means possible with your resources, talents,
    gifts, and other skill sets. We invite you to make a deliberate decision to Reach Out To All.
  `;
  const contact = [
    { label: "Email:", value: "reachouttoall@yahoo.com" },
    { label: "Blog:", value: "https://bawagemmanuel.blogspot.com" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3"
            alt="Mission work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Carrying the Gospel to the Ends of the Earth
            </h1>
            <p className="text-xl mb-8">
              Welcome to Reachout To All. Here, every soul counts. We are on a
              mission to reach out to all people with the gospel, accompanied by
              a humanitarian touch of love.

            </p>
            <Link
              to="/get-involved"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Involved
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      <div className="p-4 space-y-6 max-sm:space-y-4 max-sm:p-2  w-full ">
        {/* Title */}
        <h2 className="text-4xl font-bold">{title}</h2>

        {/* Introduction */}
        <p className="text-xl">{introduction}</p>

        {/* Message */}
        <p className="text-xl">{message}</p>

        {/* List of Items */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <p key={index} className="text-xl">
              {item.text}
            </p>
          ))}
        </div>

        {/* Closing */}
        <p className="text-xl">{closing}</p>

        {/* Signature */}
        <div className="mt-6 text-xl">
          <p>On behalf of the Brethren,</p>
          <p className="font-bold">Bawa G. Emmanuel</p>
          <p>Coordinator, Reachout To All</p>
        </div>

        {/* Contact Info */}
        <div className="text-xl">
          {contact.map((item, index) => (
            <p key={index}>
              <strong>{item.label}</strong>{" "}
              {item.label === "Blog:" ? (
                <a
                  href={item.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </p>
          ))}
        </div>
      </div>


      {/* Soul Count Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Users className="h-12 w-12" />
            <h2 className="text-4xl font-bold">Souls Won for Christ</h2>
          </div>
          <div className="text-6xl font-bold mb-4">{soulCount}</div>
          <p className="text-xl">Lives transformed by the power of the Gospel</p>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
          <p className="mb-4">Join us in our upcoming mission activities and events.</p>
          <Link to="/events" className="text-blue-600 hover:underline">
            View Events →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4">Get Involved</h3>
          <p className="mb-4">Discover ways to contribute to our mission work.</p>
          <Link to="/get-involved" className="text-blue-600 hover:underline">
            Learn More →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4">Resources</h3>
          <p className="mb-4">Access sermons, podcasts, and other spiritual materials.</p>
          <Link to="/resources" className="text-blue-600 hover:underline">
            Browse Resources →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;