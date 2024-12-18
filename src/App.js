import { addDoc, collection, getDocs } from 'firebase/firestore';
import './App.css';
import React, { useState, useEffect } from 'react'
import db from './firebase';

function App() {

  const [followers, setFollowers] = useState("");
  const [message, setMessage] = useState("");
  const [followersData, setFollowersData] = useState([]);

  // Add data to FireStore
  const handleAddData = async (e) => {
    e.preventDefault();
    console.log("Entered Follower Count:", followers)
    try {
      await addDoc(collection(db, "followers"), {
        count: parseInt(followers, 10),
        date: new Date().toLocaleString("en-EN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12:false //24 Saatlik Format
        }),
      });
      setMessage("Data Saved Successfully!");
      setFollowers("");
    }
    catch (error) {
      console.error("FireBase data add Error", error);
      setMessage("There is an Error");
    }
  };

  //FireStore'dan veri okuma
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "followers"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setFollowersData(data);
    }
    catch (error) {
      console.error("Veri Çekme Hatası:", error)
    }
  };

  // get Data when page uploaded
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="main">
      <h1>Follower Tracking App</h1>
      <form onSubmit={handleAddData}>
        <label>
          Follower :
          <input type="number" value={followers} onChange={(e) => setFollowers(e.target.value)} required />
        </label>
        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}

      {/*FireBase'den gelen Verileri Liste Olarak Gösterelim */}
      <h2>Follower Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="column">Date</th>
            <th className="column">Follower</th>
          </tr>
        </thead>
        <tbody>
          {followersData.map((item, index) => (
            <tr key={index}>
              <td className="table-value">{item.date}</td>
              <td className="table-value">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
