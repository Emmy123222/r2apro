export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  videoUrl?: string;
  type: 'past' | 'current' | 'future';
}

export interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  request: string;
  createdAt: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  message: string;
}

export interface SoulCount {
  id: string;
  count: number;
  lastUpdated: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description: string;
  videoUrl: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  imageUrl?: string;
  createdAt: string;
}