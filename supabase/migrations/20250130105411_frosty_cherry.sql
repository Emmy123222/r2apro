/*
  # Add Resources Tables

  1. New Tables
    - sermons
      - id (uuid, primary key)
      - title (text)
      - speaker (text)
      - date (timestamptz)
      - duration (text)
      - description (text)
      - video_url (text)
      - created_at (timestamptz)
    
    - documents
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - file_url (text)
      - file_type (text)
      - file_size (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public viewing and admin management
*/

-- Sermons Table
CREATE TABLE IF NOT EXISTS sermons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  speaker text NOT NULL,
  date timestamptz NOT NULL,
  duration text NOT NULL,
  description text NOT NULL,
  video_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sermons"
  ON sermons
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can modify sermons"
  ON sermons
  FOR ALL
  TO authenticated
  USING (auth.role() = 'admin');

-- Documents Table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  file_size text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view documents"
  ON documents
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can modify documents"
  ON documents
  FOR ALL
  TO authenticated
  USING (auth.role() = 'admin');