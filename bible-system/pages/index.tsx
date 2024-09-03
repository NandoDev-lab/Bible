import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [verse, setVerse] = useState('');
  const [text, setText] = useState('');

  const fetchVerse = async () => {
    try {
      const response = await axios.get('https://api.esv.org/v3/passage/text/', {
        params: {
          'q': verse,
          'include-footnotes': 'false'
        },
        headers: {
          'Authorization': `Token YOUR_ESV_API_KEY`
        }
      });
      setText(response.data.passages[0]);
    } catch (error) {
      console.error("Error fetching verse:", error);
    }
  };

  const handleInputChange = (e:any) => {
    setVerse(e.target.value);
  };

  return (
    <div>
      <h1>Sistema bíblico</h1>
      <input
        type="text"
        value={verse}
        onChange={handleInputChange}
        placeholder="Enter verse (e.g., John 3:16)"
      />
      <button onClick={fetchVerse}>Fetch Verse</button>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}