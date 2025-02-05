import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetItems } from "../hooks/useGetItems";
import { useLanguageContext } from "../context/LanguageProvider";

export default function ApprovalRight() {
  const { checkAccounts, clients, photos, setPhotos } = useGetItems();
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const { translations, language } = useLanguageContext();
  const t = translations[language];

  useEffect(() => {
    const fetchClientsAndPhotos = async () => {
      const success = await checkAccounts("clients");
    
      if (success) {
        console.log("Clients fetched successfully:", clients);
    
        // Fetch photos for each client
        for (const client of clients) {
          if (client.UserID) {
            await checkAccounts("photos", undefined, undefined, client.UserID);
          }
        }
      }
    
      setLoading(false);
    };
    
  
    fetchClientsAndPhotos();
  
    const intervalId = setInterval(fetchClientsAndPhotos, 3000);
    return () => clearInterval(intervalId);
  }, [checkAccounts, clients]);
  


  

  const updateUserStatus = async (status: string, userId: number) => {
    try {
      setUpdatingStatus(userId);
      const response = await axios.put(
        `https://fearless-growth-production.up.railway.app/user/updateStatusUser/${status}`,
        { UserID: userId },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("User status updated:", response.data);
      await checkAccounts("clients");
    } catch (error) {
      console.error("Error updating user status:", error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredClients = clients.filter((user) => user.Status === "pending");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: "40px",
        backgroundColor: "#f5d2d1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      {filteredClients.slice(0, 3).map((user) => (
  <div
    key={user.UserID}
    style={{
      backgroundColor: "#e0e0e0",
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "500px",
    }}
  >
    <p style={{ marginBottom: "10px", fontSize: "18px" }}>User ID: {user.UserID}</p>
    <p style={{ marginBottom: "10px", fontSize: "18px" }}>Username: {user.Username}</p>
    <p style={{ marginBottom: "10px", fontSize: "18px" }}>First Name: {user.FirstName}</p>
    <p style={{ marginBottom: "10px", fontSize: "18px" }}>Last Name: {user.LastName}</p>



    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#5cb85c",
          color: "#fff",
          transition: "background-color 0.3s",
          opacity: updatingStatus === user.UserID ? 0.6 : 1,
          pointerEvents: updatingStatus === user.UserID ? "none" : "auto",
        }}
        onClick={() => updateUserStatus("approved", user.UserID)}
        disabled={updatingStatus === user.UserID}
      >
        {t.approve}
      </button>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#d9534f",
          color: "#fff",
          transition: "background-color 0.3s",
          opacity: updatingStatus === user.UserID ? 0.6 : 1,
          pointerEvents: updatingStatus === user.UserID ? "none" : "auto",
        }}
        onClick={() => updateUserStatus("rejected", user.UserID)}
        disabled={updatingStatus === user.UserID}
      >
        {t.reject}
      </button>
    </div>
  </div>
      ))}

    </div>
  );
}
