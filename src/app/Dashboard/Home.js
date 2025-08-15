"use client";
import styled from "styled-components";
import { useState } from "react";
import MenuIcon from "@rsuite/icons/Menu";
import CloseIcon from "@rsuite/icons/Close";
import Link from "next/link";
import { Button, ButtonToolbar } from "rsuite";
import Image from "next/image";
import { motion } from "framer-motion";
import { Vortex } from "@/components/ui/vortex";
import { useRouter } from "next/navigation";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useRouter()
  return (
    <Body>
    <Vortex  backgroundColor="transparent" rangeY={800}
        particleCount={300}
        baseHue={120}
        baseSpeed={0.5}
        baseRadius={1.5}
  >
      <NavbarKhodalma>
        <div className="left-section">
          <h2 className="brand">Khodalmaa</h2>
        </div>

        <div className={`right-section ${menuOpen ? "open" : ""}`}>
          <Link href="/">Home</Link>
          <Link href="/">About Us</Link>
          <Link href="/">Contact Us</Link>
          <Button appearance="primary" color="cyan" size="md">
            Sign Out
          </Button>
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen((prev) => !prev)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </NavbarKhodalma>

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
              <Button appearance="ghost" color="cyan" size="lg" style={{ width: "200px" }} onClick={()=>navigate.push("/project220",target="_blank")}>
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
    align-items: center;
    padding: 60px 5%;
    gap: 40px;

    .banner-left,
    .banner-right {
      flex: 1;
    }

    .banner-left {
      display: flex;
      justify-content: center;
    }

    .banner-right {
      display: flex;
      align-items: center;

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
      padding: 40px 5%;

      .banner-left {
        order: 1;
      }
      .banner-right {
        order: 2;
        justify-content: center;

        .content {
          h1 {
            font-size: 1.8rem;
          }
          p {
            font-size: 0.95rem;
          }
          button {
            width: 100% !important;
          }
        }
      }
    }

    .hr {
      width: 70%;
    }
  }

  @media (max-width: 480px) {
    .banner {
      padding: 30px 3%;

      .banner-right .content h1 {
        font-size: 1.6rem;
      }
      .banner-right .content p {
        font-size: 0.9rem;
      }
    }

    .hr {
      width: 80%;
    }
  }
`;

const NavbarKhodalma = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  color: white;
  background: #1e3a4c;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  .brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: #00c2d1;
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 25px;

    a {
      color: white;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.2s ease-in;
      &:hover {
        color: #00c2d1;
      }
    }
  }

  .menu-toggle {
    display: none;
    font-size: 1.8rem;
    cursor: pointer;
    color: white;
  }

  @media (max-width: 768px) {
    .right-section {
      display: none;
      flex-direction: column;
      background: #1e3a4c;
      position: absolute;
      top: 70px;
      right: 0;
      width: 220px;
      border-radius: 0 0 10px 10px;
      padding: 15px;
      gap: 15px;
    }
    .right-section.open {
      display: flex;
    }
    .menu-toggle {
      display: block;
    }
  }
`;
