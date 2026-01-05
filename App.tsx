
import React, { useState, useMemo } from 'react';
import { CalendarSource } from './types';

const App: React.FC = () => {
  const [calendars, setCalendars] = useState<CalendarSource[]>([
    { id: 'primary', name: 'יומן ראשי (Rockstar)', src: 'rockstarbizzzz@gmail.com', color: '#039be5', active: true },
    { id: 'adi', name: 'עדי דניאל', src: 'adi1311daniel@gmail.com', color: '#f6bf26', active: true },
    { id: 'arzit', name: 'ארזית נחום', src: 'arzit.nahum@gmail.com', color: '#d50000', active: true },
    { id: 'merav', name: 'מרב', src: 'merava73@gmail.com', color: '#0b8043', active: true },
    { id: 'holidays', name: 'חגי ישראל', src: 'iw.jewish#holiday@group.v.calendar.google.com', color: '#0b8043', active: false },
  ]);

  const toggleCalendar = (id: string) => {
    setCalendars(prev => prev.map(cal => 
      cal.id === id ? { ...cal, active: !cal.active } : cal
    ));
  };

  const calendarEmbedUrl = useMemo(() => {
    // Added &mode=WEEK to ensure the default view is weekly
    const baseUrl = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FJerusalem&showPrint=0&mode=WEEK";
    const activeCals = calendars.filter(c => c.active);
    
    if (activeCals.length === 0) {
      return `${baseUrl}&src=rockstarbizzzz@gmail.com&color=%23039be5`;
    }

    const srcParams = activeCals.map(c => `src=${encodeURIComponent(c.src)}`).join('&');
    const colorParams = activeCals.map(c => `color=${encodeURIComponent(c.color)}`).join('&');
    
    return `${baseUrl}&${srcParams}&${colorParams}`;
  }, [calendars]);

  return (
    <div className="flex flex-col h-screen w-full bg-white font-sans text-right" dir="rtl">
      {/* Header - Simple CRM Style */}
      <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6 shrink-0 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800">בדיקת זמינות ויומנים</h1>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-[50vw]">
            {calendars.map(cal => (
              <button
                key={cal.id}
                onClick={() => toggleCalendar(cal.id)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-2 whitespace-nowrap ${
                  cal.active 
                  ? 'bg-gray-100 border-gray-300 text-gray-800 font-bold' 
                  : 'bg-white border-gray-200 text-gray-400 opacity-60'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cal.color }}></span>
                {cal.name}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => window.open('https://calendar.google.com/calendar/u/0/r/eventedit', '_blank')}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
        >
          פגישה חדשה +
        </button>
      </header>

      {/* Main Calendar View */}
      <div className="flex-1 bg-gray-50 p-2 overflow-hidden">
        <div className="w-full h-full bg-white rounded-lg shadow-inner border border-gray-200 overflow-hidden relative">
          <iframe 
            src={calendarEmbedUrl}
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
            title="Google Calendar View"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
