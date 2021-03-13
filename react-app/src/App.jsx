import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  RecoilRoot,
} from "recoil"

import {
  Container,
  Col,
  Row,
  Spinner,
} from "react-bootstrap"

import "styles/app.scss";

const Navbar = lazy(() => import("components/Navbar"));
const ImageTable = lazy(() => import("components/ImageTable"));

const App = () => {
  return (
    <RecoilRoot>
      <MyApp />
    </RecoilRoot>
  );
}

const MyApp = () => {
  useEffect(() => {
  }, []);

  return (
    <div>
      <Suspense fallback={
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}>
        <Navbar />
      </Suspense>

      <Container>
        <Suspense fallback={
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>}>
          <ImageTable></ImageTable>
        </Suspense>
      </Container>
      
    </div>
  );
};

export default App;
