"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseconfig";


const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfile({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          createdAt: user.metadata.creationTime, // Fix: use creationTime instead of createdAt
          displayName: user.reloadUserInfo?.screenName || user.displayName
        });
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
