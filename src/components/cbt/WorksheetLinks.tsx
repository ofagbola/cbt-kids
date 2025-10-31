import React from 'react';

export default function WorksheetLinks() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-subheading font-semibold text-lg mb-2">Want to Learn More?</h3>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-800 mb-2">Worksheets:</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <a 
              href="https://docs.google.com/document/d/1Gq-uzVCDRPcpczQRKIq0b5kfqMY8iFzWSa-WvvBJN0U/edit?tab=t.0#heading=h.bfxslc8sk7eq" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              THOUGHTS Worksheet
            </a>
          </li>
          <li>
            <a 
              href="https://docs.google.com/document/d/1NBiyzYB2tU1QVzzsokot2SFqpZds3vaYoPVyyeOpPyk/edit?tab=t.0" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              EMOTIONS Worksheet
            </a>
          </li>
          <li>
            <a 
              href="https://docs.google.com/document/d/1vxwilNV3Dn2DDhBfTrJsf2AyK0ZUbA3UWznBdFsq0eQ/edit?tab=t.0" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ACTIONS: Activity - Positive Affirmation Poster
            </a>
          </li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-800 mb-2">See what others have made!</h4>
        <a 
          href="#" 
          target="_blank" 
          rel="noreferrer" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          (link to all the board photos)
        </a>
      </div>
    </div>
  );
}
