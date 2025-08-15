"use client";
import styled from "styled-components";
import { useState } from "react";

import Link from "next/link";
import { Button, ButtonToolbar } from "rsuite";
import Image from "next/image";
import { motion } from "framer-motion";
import { Vortex } from "@/components/ui/vortex";
import { useRouter } from "next/navigation";
import Nav from "@/components/ui/Nav";

const Home = () => {
  const navigate = useRouter()
  return (
    <Body>
    <Vortex  backgroundColor="transparent" rangeY={800}
        particleCount={300}
        baseHue={120}
        baseSpeed={0.5}
        baseRadius={1.5}
  >
      <Nav/>
      <div className="banner">
        <motion.div
          className="banner-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/assets/image3.png"
            width={500}
            height={500}
            alt="Investment Illustration"
            priority
          />
        </motion.div>

        <motion.div
          className="banner-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="content">
            <h1>Trust the numbers, not luck.</h1>
            <p>The win is in your hands. Make informed decisions and grow confidently.</p>
            <ButtonToolbar>
              <Button appearance="primary" color="cyan" size="lg" style={{ width: "200px" }} >
                Project 10
              </Button>
              <Button appearance="ghost" color="cyan" size="lg" style={{ width: "200px" }} onClick={()=>navigate.push("/project220","_blank")}>
                Project 220
              </Button>
            </ButtonToolbar>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hr"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
      />
      </Vortex>
    </Body>
  );
};

export default Home;

const Body = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fbfd, #eef4f7);
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;

  .hr {
    height: 2px;
    width: 50%;
    margin: 30px auto;
    background: linear-gradient(to right, #00c2d1, #1e3a4c);
    border-radius: 2px;
    transform-origin: center;
  }

  .banner {
    display: flex;
    flex-wrap: wrap; 
    align-items: center;
    justify-content: center;
    padding: 60px 5%;
    gap: 40px;

    .banner-left,
    .banner-right {
      flex: 1;
      min-width: 280px;
    }

    .banner-left {
      display: flex;
      justify-content: center;

      img {
        max-width: 100%; 
        height: auto;
      }
    }

    .banner-right {
      display: flex;
      align-items: center;
      justify-content: center; 

      .content {
        max-width: 500px;

        h1 {
          font-size: 2.3rem;
          font-weight: 700;
          color: #1e3a4c;
          margin-bottom: 15px;
        }
        p {
          font-size: 1.1rem;
          color: #4b5b66;
          margin-bottom: 30px;
        }
        button {
          font-weight: 600;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .banner {
      padding: 40px 4%;
      gap: 30px;

      .banner-right .content h1 {
        font-size: 2rem;
      }
      .banner-right .content p {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    .banner {
      flex-direction: column;
      text-align: center;
      padding: 30px 5%; 
      gap: 20px; 
    }

    .banner-left {
      order: 1;
    }
    .banner-right {
      order: 2;

      .content {
        h1 {
          font-size: 1.8rem;
        }
        p {
          font-size: 0.95rem;
        }
        button {
          width: 96% !important;
        }
      }
    }

    .hr {
      width: 70%;
    }
  }

  @media (max-width: 480px) {
    .banner {
      padding: 20px 3%;
    }

    .banner-right .content h1 {
      font-size: 1.6rem;
    }
    .banner-right .content p {
      font-size: 0.9rem;
    }

    .hr {
      width: 80%;
    }
  }
`;
