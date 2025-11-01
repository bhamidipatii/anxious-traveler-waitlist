import React, { useState, useEffect, useRef } from 'react';
import { Plane, Calendar, MapPin, Cloud, TrendingUp, Users, Star, ThermometerSun, Navigation, X, Lightbulb } from 'lucide-react';

const CITIES_DATABASE = [
  { name: "New York", country: "United States", code: "JFK" },
  { name: "London", country: "United Kingdom", code: "LHR" },
  { name: "Paris", country: "France", code: "CDG" },
  { name: "Tokyo", country: "Japan", code: "NRT" },
  { name: "Dubai", country: "United Arab Emirates", code: "DXB" },
  { name: "Singapore", country: "Singapore", code: "SIN" },
  { name: "Hong Kong", country: "China", code: "HKG" },
  { name: "Barcelona", country: "Spain", code: "BCN" },
  { name: "Rome", country: "Italy", code: "FCO" },
  { name: "Amsterdam", country: "Netherlands", code: "AMS" },
  { name: "Bangkok", country: "Thailand", code: "BKK" },
  { name: "Istanbul", country: "Turkey", code: "IST" },
  { name: "Los Angeles", country: "United States", code: "LAX" },
  { name: "Miami", country: "United States", code: "MIA" },
  { name: "Sydney", country: "Australia", code: "SYD" },
  { name: "Melbourne", country: "Australia", code: "MEL" },
  { name: "Toronto", country: "Canada", code: "YYZ" },
  { name: "Vancouver", country: "Canada", code: "YVR" },
  { name: "Mumbai", country: "India", code: "BOM" },
  { name: "Delhi", country: "India", code: "DEL" },
  { name: "Seoul", country: "South Korea", code: "ICN" },
  { name: "Shanghai", country: "China", code: "PVG" },
  { name: "Beijing", country: "China", code: "PEK" },
  { name: "Mexico City", country: "Mexico", code: "MEX" },
  { name: "São Paulo", country: "Brazil", code: "GRU" },
  { name: "Buenos Aires", country: "Argentina", code: "EZE" },
  { name: "Berlin", country: "Germany", code: "BER" },
  { name: "Munich", country: "Germany", code: "MUC" },
  { name: "Madrid", country: "Spain", code: "MAD" },
  { name: "Lisbon", country: "Portugal", code: "LIS" },
  { name: "Vienna", country: "Austria", code: "VIE" },
  { name: "Prague", country: "Czech Republic", code: "PRG" },
  { name: "Athens", country: "Greece", code: "ATH" },
  { name: "Cairo", country: "Egypt", code: "CAI" },
  { name: "Cape Town", country: "South Africa", code: "CPT" },
  { name: "Nairobi", country: "Kenya", code: "NBO" },
  { name: "Moscow", country: "Russia", code: "SVO" },
  { name: "Bali", country: "Indonesia", code: "DPS" },
  { name: "Phuket", country: "Thailand", code: "HKT" },
  { name: "Maldives", country: "Maldives", code: "MLE" },
  { name: "Santorini", country: "Greece", code: "JTR" },
  { name: "Reykjavik", country: "Iceland", code: "KEF" },
  { name: "Oslo", country: "Norway", code: "OSL" },
  { name: "Stockholm", country: "Sweden", code: "ARN" },
  { name: "Copenhagen", country: "Denmark", code: "CPH" },
  { name: "Dublin", country: "Ireland", code: "DUB" },
  { name: "Edinburgh", country: "United Kingdom", code: "EDI" },
  { name: "Brussels", country: "Belgium", code: "BRU" },
  { name: "Zurich", country: "Switzerland", code: "ZRH" },
  { name: "San Francisco", country: "United States", code: "SFO" },
  { name: "Seattle", country: "United States", code: "SEA" }
];

const TravelPlanner = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchCities = (query) => {
    if (!query || query.length < 2) return [];
    const filtered = CITIES_DATABASE.filter(city =>
      city.name.toLowerCase().startsWith(query.toLowerCase()) ||
      city.country.toLowerCase().includes(query.toLowerCase())
    );
    return filtered.slice(0, 5);
  };

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFromCity(value);
    setFromSuggestions(searchCities(value));
    setShowFromSuggestions(true);
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setToCity(value);
    setToSuggestions(searchCities(value));
    setShowToSuggestions(true);
  };

  const selectFromCity = (city) => {
    setFromCity(`${city.name}, ${city.country}`);
    setShowFromSuggestions(false);
  };

  const selectToCity = (city) => {
    setToCity(`${city.name}, ${city.country}`);
    setShowToSuggestions(false);
  };

  const calculateWeeks = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.ceil(diffDays / 7);
    return weeks;
  };

  const handleSearch = () => {
    if (fromCity && toCity && startDate && endDate) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowResults(true);
      }, 1500);
    }
  };

  const resetSearch = () => {
    setShowResults(false);
    setFromCity('');
    setToCity('');
    setStartDate('');
    setEndDate('');
  };

  const weeks = calculateWeeks();

  if (showResults) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <style>{`
          @keyframes float1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(100px, -80px) scale(1.1); }
            66% { transform: translate(-50px, 100px) scale(0.9); }
          }
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-120px, 100px) scale(0.9); }
            66% { transform: translate(80px, -70px) scale(1.1); }
          }
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(60px, 90px) scale(1.05); }
            66% { transform: translate(-90px, -60px) scale(0.95); }
          }
          @keyframes float4 {
            0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
            50% { transform: translate(-30px, -40px) scale(1.08) rotate(180deg); }
          }
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
        
        <div className="fixed inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-slate-300 bg-[length:200%_200%]" style={{animation: 'gradient-shift 15s ease infinite'}}></div>
        <div className="fixed inset-0 backdrop-blur-3xl bg-white/30"></div>
        
        <div className="fixed top-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-400/50 to-slate-300/40 rounded-full blur-3xl" style={{animation: 'float1 20s ease-in-out infinite'}}></div>
        <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-slate-300/50 to-gray-300/50 rounded-full blur-3xl" style={{animation: 'float2 25s ease-in-out infinite'}}></div>
        <div className="fixed top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-gray-300/40 to-slate-400/30 rounded-full blur-3xl" style={{animation: 'float4 18s ease-in-out infinite'}}></div>

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Travel Insights</h1>
            <button
              onClick={resetSearch}
              className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md text-gray-700 rounded-full hover:bg-white/80 transition-all border border-gray-300/50"
            >
              <X size={20} />
              New Search
            </button>
          </div>

          <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-white/60 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/50 p-3 rounded-2xl border border-gray-200/50">
                  <Plane className="text-gray-700" size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Your Journey</p>
                  <p className="text-gray-800 text-xl font-semibold">{fromCity} → {toCity}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-gray-600 text-sm">Travel Period</p>
                  <p className="text-gray-800 font-semibold">{new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Duration</p>
                  <p className="text-gray-800 font-semibold">{weeks} {weeks === 1 ? 'week' : 'weeks'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/60 hover:bg-white/50 transition-all shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-300/30">
                  <Plane className="text-blue-700" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Best Airlines</h2>
              </div>
              <div className="space-y-3">
                {['Emirates', 'Singapore Airlines', 'Qatar Airways'].map((airline, idx) => (
                  <div key={idx} className="bg-white/50 rounded-xl p-4 flex items-center justify-between border border-gray-200/50">
                    <div>
                      <p className="text-gray-800 font-semibold">{airline}</p>
                      <p className="text-gray-600 text-sm">Avg. $650 • 5★ rating</p>
                    </div>
                    <Star className="text-yellow-500" size={20} fill="currentColor" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/60 hover:bg-white/50 transition-all shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500/20 p-3 rounded-xl border border-orange-300/30">
                  <Cloud className="text-orange-700" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Weather History</h2>
              </div>
              <div className="bg-white/50 rounded-xl p-4 mb-3 border border-gray-200/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-800 font-semibold">Historical Average</p>
                  <ThermometerSun className="text-orange-600" size={20} />
                </div>
                <p className="text-gray-700 text-3xl font-bold">24°C / 75°F</p>
                <p className="text-gray-600 text-sm mt-2">Mostly sunny with occasional showers</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/50 rounded-lg p-3 text-center border border-gray-200/50">
                  <p className="text-gray-600 text-xs">Humidity</p>
                  <p className="text-gray-800 font-bold">65%</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center border border-gray-200/50">
                  <p className="text-gray-600 text-xs">Rainfall</p>
                  <p className="text-gray-800 font-bold">50mm</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center border border-gray-200/50">
                  <p className="text-gray-600 text-xs">Wind</p>
                  <p className="text-gray-800 font-bold">15km/h</p>
                </div>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/60 hover:bg-white/50 transition-all shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500/20 p-3 rounded-xl border border-green-300/30">
                  <Calendar className="text-green-700" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Best Time to Visit</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-green-100/60 border border-green-300/40 rounded-xl p-4">
                  <p className="text-green-700 font-semibold mb-1">Peak Season</p>
                  <p className="text-gray-800 text-lg">June - August</p>
                  <p className="text-gray-600 text-sm">Perfect weather, more crowds</p>
                </div>
                <div className="bg-blue-100/60 border border-blue-300/40 rounded-xl p-4">
                  <p className="text-blue-700 font-semibold mb-1">Shoulder Season</p>
                  <p className="text-gray-800 text-lg">April - May, Sept - Oct</p>
                  <p className="text-gray-600 text-sm">Good weather, fewer tourists</p>
                </div>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/60 hover:bg-white/50 transition-all shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-300/30">
                  <TrendingUp className="text-purple-700" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Interest Trends</h2>
              </div>
              <div className="bg-white/50 rounded-xl p-4 mb-3 border border-gray-200/50">
                <p className="text-gray-800 font-semibold mb-2">Search Volume</p>
                <div className="flex items-end gap-1 h-24">
                  {[40, 60, 45, 80, 95, 70, 85, 90, 75, 100, 85, 95].map((height, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-gradient-to-t from-gray-400 to-gray-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="text-gray-700">
                <span className="text-green-600 font-bold">↑ 34%</span> increase in searches this month
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/60 hover:bg-white/50 transition-all shadow-lg md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-pink-500/20 p-3 rounded-xl border border-pink-300/30">
                  <Users className="text-pink-700" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Popular With</h2>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { type: 'Adventure', percent: 85, icon: Navigation, color: 'orange' },
                  { type: 'Wellness', percent: 65, icon: ThermometerSun, color: 'green' },
                  { type: 'Leisure', percent: 92, icon: Star, color: 'yellow' },
                  { type: 'Cultural', percent: 78, icon: MapPin, color: 'purple' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-white/50 rounded-xl p-4 text-center border border-gray-200/50">
                      <div className={`bg-${item.color}-200/60 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 border border-${item.color}-300/40`}>
                        <Icon className={`text-${item.color}-700`} size={20} />
                      </div>
                      <p className="text-gray-800 font-semibold mb-1">{item.type}</p>
                      <p className="text-2xl font-bold text-gray-800">{item.percent}%</p>
                      <p className="text-gray-600 text-sm">of travelers</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(100px, -80px) scale(1.1); }
          66% { transform: translate(-50px, 100px) scale(0.9); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-120px, 100px) scale(0.9); }
          66% { transform: translate(80px, -70px) scale(1.1); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, 90px) scale(1.05); }
          66% { transform: translate(-90px, -60px) scale(0.95); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-30px, -40px) scale(1.08) rotate(180deg); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 animate-gradient bg-[length:200%_200%]" style={{animation: 'gradient-shift 15s ease infinite'}}></div>
      <div className="fixed inset-0 backdrop-blur-3xl bg-white/20"></div>
      
      <div className="fixed top-10 left-10 w-96 h-96 bg-gradient-to-br from-gray-300/60 to-slate-300/40 rounded-full blur-3xl" style={{animation: 'float1 20s ease-in-out infinite'}}></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-slate-300/50 to-gray-200/60 rounded-full blur-3xl" style={{animation: 'float2 25s ease-in-out infinite'}}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-gray-200/40 to-slate-200/50 rounded-full blur-3xl" style={{animation: 'float3 30s ease-in-out infinite'}}></div>
      <div className="fixed top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-gray-400/30 to-slate-300/30 rounded-full blur-3xl" style={{animation: 'float4 18s ease-in-out infinite'}}></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 tracking-tight">
              Pick Your Destination
            </h1>
            <p className="text-xl text-gray-600">
              Discover insights for your perfect trip
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/60 shadow-2xl">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative" ref={fromRef}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="text"
                      value={fromCity}
                      onChange={handleFromChange}
                      onFocus={() => setShowFromSuggestions(true)}
                      placeholder="Departure city"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-md border border-gray-300/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                    />
                  </div>
                  {showFromSuggestions && fromSuggestions.length > 0 && (
                    <div className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                      {fromSuggestions.map((city, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectFromCity(city)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-all flex items-center gap-3 border-b border-gray-100 last:border-0"
                        >
                          <MapPin size={16} className="text-gray-600" />
                          <div>
                            <p className="font-semibold text-gray-900">{city.name}</p>
                            <p className="text-sm text-gray-600">{city.country} • {city.code}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative" ref={toRef}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    To
                  </label>
                  <div className="relative">
                    <Navigation className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="text"
                      value={toCity}
                      onChange={handleToChange}
                      onFocus={() => setShowToSuggestions(true)}
                      placeholder="Destination city"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-md border border-gray-300/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                    />
                  </div>
                  {showToSuggestions && toSuggestions.length > 0 && (
                    <div className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                      {toSuggestions.map((city, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectToCity(city)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-all flex items-center gap-3 border-b border-gray-100 last:border-0"
                        >
                          <Navigation size={16} className="text-gray-600" />
                          <div>
                            <p className="font-semibold text-gray-900">{city.name}</p>
                            <p className="text-sm text-gray-600">{city.country} • {city.code}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Travel Week(s)
                </label>
                <div className="bg-white/50 backdrop-blur-md border border-gray-300/50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="text-gray-500" size={20} />
                    <span className="text-gray-700 font-medium text-sm">Select your travel dates</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Start</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 bg-white/60 border border-gray-300/50 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">End</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 bg-white/60 border border-gray-300/50 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                      />
                    </div>
                  </div>
                  {startDate && endDate && weeks > 0 && (
                    <div className="text-center bg-gray-800 text-white py-2 px-4 rounded-xl">
                      <span className="font-bold text-lg">{weeks}</span> <span className="text-sm">{weeks === 1 ? 'week' : 'weeks'} selected</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={loading || !fromCity || !toCity || !startDate || !endDate}
                className="w-full py-5 bg-gray-800 text-white rounded-2xl font-bold text-lg hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Lightbulb size={20} />
                    Get Travel Insights
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-8 text-sm">
            Powered by Anxious Traveler Beta • Making travel stress-free
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanner;