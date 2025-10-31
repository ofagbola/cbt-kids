import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface GratitudeEntry {
  id: string;
  text: string;
  date: string;
}

export default function GratitudeJournal() {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = localStorage.getItem('cbt.gratitudeEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }

    // Set today's date
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    setCurrentDate(today);

    // Check if there's already an entry for today
    const todayEntryExists = JSON.parse(savedEntries || '[]').some(
      (entry: GratitudeEntry) => entry.date === today
    );
    if (todayEntryExists) {
      const entry = JSON.parse(savedEntries || '[]').find(
        (entry: GratitudeEntry) => entry.date === today
      );
      setTodayEntry(entry.text);
    }
  }, []);

  const handleSave = () => {
    if (!todayEntry.trim()) return;

    const newEntry: GratitudeEntry = {
      id: Date.now().toString(),
      text: todayEntry,
      date: currentDate
    };

    // Check if entry for today exists
    const existingEntryIndex = entries.findIndex(e => e.date === currentDate);
    
    let updatedEntries;
    if (existingEntryIndex !== -1) {
      // Update existing entry
      updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = newEntry;
    } else {
      // Add new entry
      updatedEntries = [...entries, newEntry];
    }

    setEntries(updatedEntries);
    localStorage.setItem('cbt.gratitudeEntries', JSON.stringify(updatedEntries));
  };

  const handleDelete = (id: string) => {
    const updatedEntries = entries.filter(e => e.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('cbt.gratitudeEntries', JSON.stringify(updatedEntries));
    
    // Clear today's entry if it was deleted
    const deletedEntry = entries.find(e => e.id === id);
    if (deletedEntry?.date === currentDate) {
      setTodayEntry('');
    }
  };

  const recentEntries = [...entries].reverse().slice(0, 7);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 font-heading">
          📝 Gratitude Journal
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Write one thing you are grateful for each day! Gratitude journaling can increase happiness by as much as 25%! (NIH)
        </p>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Today ({currentDate})
            </label>
            <Textarea
              value={todayEntry}
              onChange={(e) => setTodayEntry(e.target.value)}
              placeholder="Write something you're grateful for today..."
              className="min-h-24"
            />
          </div>
          
          <Button 
            onClick={handleSave} 
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={!todayEntry.trim()}
          >
            Save Entry
          </Button>
        </div>
      </div>

      {/* Recent Entries */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 font-subheading">
          Recent Entries
        </h3>
        
        {recentEntries.length === 0 ? (
          <Card className="bg-gray-50">
            <CardContent className="p-4 text-center text-gray-500">
              No entries yet. Start your gratitude journey today!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {recentEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-xs font-medium text-gray-500">
                          {entry.date}
                        </div>
                        <Button
                          onClick={() => handleDelete(entry.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </Button>
                      </div>
                      <div className="text-sm text-gray-700">{entry.text}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

