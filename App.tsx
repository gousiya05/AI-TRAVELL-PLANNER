
import React, { useState, useEffect } from 'react';
import { Destination, HolidayPackage, Activity } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Search from './components/Search';
import ServiceNav from './components/ServiceNav';
import PopularPlaces from './components/PopularPlaces';
import PhotoGallery from './components/PhotoGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DestinationsGrid from './components/DestinationsGrid';
import TravelShop from './components/TravelShop';
import FlightSearch from './components/FlightSearch';
import HotelsPage from './components/HotelsPage';
import HomestaysPage from './components/HomestaysPage';
import ScrollToTopButton from './components/ScrollToTopButton';
import DestinationModal from './components/DestinationModal';
import SearchResults from './components/SearchResults';
import VisaPage from './components/VisaPage';
import HolidayPackagesPage from './components/HolidayPackagesPage';
import PackageDetailPage from './components/PackageDetailPage';
import TrainsPage from './components/TrainsPage';
import BusesPage from './components/BusesPage';
import CabsPage from './components/CabsPage';
import ToursPage from './components/ToursPage';
import ActivityDetailPage from './components/ActivityDetailPage';
import Chatbox from './components/Chatbox';

export type View = 'home' | 'destinations' | 'shop' | 'flights' | 'search' | 'visa' | 'hotels' | 'homestays' | 'packages' | 'packageDetail' | 'trains' | 'buses' | 'cabs' | 'tours' | 'activityDetail';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [scrollToAnchor, setScrollToAnchor] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<HolidayPackage | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (scrollToAnchor && currentView === 'home') {
      const element = document.querySelector(scrollToAnchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setScrollToAnchor(null); // Reset after scrolling
    }
  }, [scrollToAnchor, currentView]);

  const handleNavigation = (anchor: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setScrollToAnchor(anchor);
    } else {
      const element = document.querySelector(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  const handleViewChange = (view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };
  
  const handleSelectDestination = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
  };

  const handleBookTrip = () => {
    handleCloseModal();
    handleViewChange('flights');
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchQuery(query);
      handleViewChange('search');
    }
  };
  
  const handleSuggestionClick = (destinationName: string) => {
    setSearchQuery(destinationName);
    // The view is already 'search', so just updating the query will re-render SearchResults
  };

  const handleSelectPackage = (pkg: HolidayPackage) => {
    setSelectedPackage(pkg);
    handleViewChange('packageDetail');
  };

  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    handleViewChange('activityDetail');
  };


  const renderContent = () => {
    switch (currentView) {
      case 'destinations':
        return <DestinationsGrid onBack={() => handleViewChange('home')} onSelectDestination={handleSelectDestination} />;
      case 'shop':
        return <TravelShop onBack={() => handleViewChange('home')} />;
      case 'flights':
        return <FlightSearch onBack={() => handleViewChange('home')} />;
      case 'hotels':
        return <HotelsPage onBack={() => handleViewChange('home')} />;
      case 'homestays':
        return <HomestaysPage onBack={() => handleViewChange('home')} />;
      case 'visa':
        return <VisaPage onBack={() => handleViewChange('home')} />;
      case 'trains':
        return <TrainsPage onBack={() => handleViewChange('home')} />;
      case 'buses':
        return <BusesPage onBack={() => handleViewChange('home')} />;
      case 'cabs':
        return <CabsPage onBack={() => handleViewChange('home')} />;
      case 'packages':
        return <HolidayPackagesPage onBack={() => handleViewChange('home')} onSelectPackage={handleSelectPackage} />;
      case 'packageDetail':
        return selectedPackage ? <PackageDetailPage pkg={selectedPackage} onBack={() => handleViewChange('packages')} /> : <div>Package not found</div>;
      case 'tours':
        return <ToursPage onBack={() => handleViewChange('home')} onSelectActivity={handleSelectActivity} />;
      case 'activityDetail':
        return selectedActivity ? <ActivityDetailPage activity={selectedActivity} onBack={() => handleViewChange('tours')} /> : <div>Activity not found</div>;
      case 'search':
        return <SearchResults 
                  query={searchQuery} 
                  onBack={() => handleViewChange('home')} 
                  onSelectDestination={handleSelectDestination}
                  onSuggestionClick={handleSuggestionClick}
                />;
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={handleNavigation} />
            <Search onSearch={handleSearch} />
            <ServiceNav onViewChange={handleViewChange} />
            <PopularPlaces onSelectDestination={handleSelectDestination} />
            <PhotoGallery />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Header onNavigate={handleNavigation} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
      <ScrollToTopButton />
      <DestinationModal 
        destination={selectedDestination} 
        onClose={handleCloseModal}
        onBookTrip={handleBookTrip}
      />
      <Chatbox />
    </div>
  );
};

export default App;
