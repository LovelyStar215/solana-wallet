import React from "react";
import type { NextPage } from "next";
import CreateAccount from "../components/CreateAccount";
import RestoreAccount from "../components/RestoreAccount";
import styled from "styled-components";

const Home: NextPage = () => {
  return (
    <>
      <HomeTitle>
        A simple, non-custodial crypto wallet for managing{" "}
        <a href="https://solana.com/">Solana</a> digital assets.
      </HomeTitle>

      <HomeGrid>
        <CreateAccount></CreateAccount>
        <RestoreAccount></RestoreAccount>
      </HomeGrid>
    </>
  );
};

const HomeTitle = styled.h1`
  padding: 0 3rem;
  margin: 3rem 1rem;
  line-height: 1.25;
  font-size: 1.5rem;
  font-weight: normal;
  text-align: center;

  & > a {
    color: #0070f3;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
`;

const HomeGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  width: 100%;
`;

export default Home;
