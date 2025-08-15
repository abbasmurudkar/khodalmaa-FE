"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { Button } from 'rsuite';
import MenuIcon from "@rsuite/icons/Menu";
import CloseIcon from "@rsuite/icons/Close";
import styled from 'styled-components';
const Nav = () => {
const [menuOpen, setMenuOpen] = useState(false);
  return (
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
  )
}

export default Nav

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

