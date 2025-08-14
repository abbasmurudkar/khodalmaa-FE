"use client"
import { useProfile } from "@/context/profileprovider";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Loader } from "rsuite";

const PrivateRoute = ({ children }) => {
  const { profile, loading } = useProfile();
  const router = useRouter();

  useEffect(()=>{
if(!profile && !loading){
    router.replace("/")
  }
  },[profile,loading,router])
  
  if (loading) {
    return (
      <Container>
        <Loader center vertical speed="slow" size="md" content="Loading..." />
      </Container>
    );
  }
  if (!profile) return null

  return children;
};

export default PrivateRoute;