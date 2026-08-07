import React, { createContext, useContext, useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useAuth } from "./AuthContext";

interface ActiveToast {
  postId: string;
  message: string;
}

interface SignalRContextType {
  connection: HubConnection | null;
  activeToast: ActiveToast | null;
  dismissToast: () => void;
  joinBlogGroup: (postId: string) => Promise<void>;
  leaveBlogGroup: (postId: string) => Promise<void>;
}

const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

export const useSignalR = () => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error("useSignalR must be used within a SignalRProvider");
  }
  return context;
};

export const SignalRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [activeToast, setActiveToast] = useState<ActiveToast | null>(null);

  const dismissToast = () => {
    setActiveToast(null);
  };

  useEffect(() => {
    const hubUrl = import.meta.env.VITE_SIGNALR_HUB_URL;
    if (!hubUrl) {
      console.warn("SignalR Hub URL is not defined in environment variables.");
      return;
    }

    // Build the connection
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => {
          return localStorage.getItem("accessToken") || "";
        },
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    // Start the connection
    const startConnection = async () => {
      try {
        await newConnection.start();
        console.log("Connected to SignalR Hub successfully.");

        // Listen for global notifications (for authors)
        newConnection.on("ReceiveNotification", (postId: string, message: string) => {
          console.log("Received ReceiveNotification event:", { postId, message });
          setActiveToast({ postId, message });
        });

        setConnection(newConnection);
      } catch (err) {
        console.error("SignalR Connection Error: ", err);
      }
    };

    startConnection();

    // Cleanup
    return () => {
      newConnection.off("ReceiveNotification");
      newConnection
        .stop()
        .then(() => console.log("SignalR Connection stopped."))
        .catch((err) => console.error("Error stopping SignalR connection:", err));
    };
  }, [user]); // Re-connect when user logs in/out to pass new token via accessTokenFactory

  const joinBlogGroup = async (postId: string) => {
    if (connection && connection.state === "Connected") {
      try {
        await connection.invoke("JoinGroupAsync", postId);
        console.log(`Joined group for post ${postId}`);
      } catch (err) {
        console.error(`Failed to join group for post ${postId}:`, err);
      }
    }
  };

  const leaveBlogGroup = async (postId: string) => {
    if (connection && connection.state === "Connected") {
      try {
        await connection.invoke("LeavePostGroup", postId);
        console.log(`Left group for post ${postId}`);
      } catch (err) {
        console.error(`Failed to leave group for post ${postId}:`, err);
      }
    }
  };

  return (
    <SignalRContext.Provider
      value={{
        connection,
        activeToast,
        dismissToast,
        joinBlogGroup,
        leaveBlogGroup,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};
