
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Resources from './pages/Resources';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import AuthGuard from './components/AuthGuard';
import PageTransition from './components/PageTransition';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <AnimatePresence mode="wait">
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/get-involved" element={<PageTransition><GetInvolved /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
              <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
              <Route path="/admin" element={
                <AuthGuard>
                  <PageTransition><AdminDashboard /></PageTransition>
                </AuthGuard>
              } />
            </Routes>
          </main>
        </AnimatePresence>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#4B5563',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#059669',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#DC2626',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;