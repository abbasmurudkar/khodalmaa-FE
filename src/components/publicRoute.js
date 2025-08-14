"use client";
import { useProfile } from "@/context/profileprovider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container, Loader } from "rsuite";

const PublicRoute = ({ children }) => {
  const { profile, loading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!loading && profile) {
      router.replace("/Dashboard");
    }
  }, [loading, profile, router]);

  if (loading) {
    return (
      <Container>
        <Loader center vertical speed="slow" size="md" content="Loading..." />
      </Container>
    );
  }

  if (profile) return null;

  return children;
};

export default PublicRoute;
