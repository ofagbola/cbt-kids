import React from 'react';

export default function WorksheetLinks() {
  return (
    <div className="space-y-2">
      <div className="font-subheading font-semibold">Worksheets</div>
      <ul className="list-disc pl-6 text-primary">
        <li><a href="https://docs.google.com" target="_blank" rel="noreferrer" className="underline">Thoughts worksheet</a></li>
        <li><a href="https://docs.google.com" target="_blank" rel="noreferrer" className="underline">Emotions worksheet</a></li>
        <li><a href="https://docs.google.com" target="_blank" rel="noreferrer" className="underline">Actions worksheet</a></li>
      </ul>
    </div>
  );
}
