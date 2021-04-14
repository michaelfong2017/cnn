import { hot } from 'react-hot-loader/root';
import React, { lazy, Suspense, useEffect } from "react";
import {
  RecoilRoot,
} from "recoil"
import {
  HashRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {
  Container,
  Col,
  Row,
  Spinner,
} from "react-bootstrap"

import "styles/app.scss";

const Navbar = lazy(() => import("components/Navbar"));
const ImageTable = lazy(() => import("components/ImageTable"));
const ImageClassifier = lazy(() => import("components/ImageClassifier"));

const App = () => {
  return (
    <RecoilRoot>
      <HashRouter hashType="noslash">
        <MyApp />
      </HashRouter>
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
        <Switch>
          {/* <Route exact path='/' component={Navbar} /> */}
          <Route path='/classification-demo' component={ClassificationDemo} />
          <Route path='/source-code' component={SourceCode} />
          <Route path='/proposal' component={Proposal} />
          <Route path='/powerpoint' component={Powerpoint} />

          <Route exactpath='/'>
            <Redirect to='/classification-demo' />
          </Route>
          <Route exactpath='/home'>
            <Redirect to='/classification-demo' />
          </Route>
        </Switch>
      </Container>

    </div>
  );
};

const ClassificationDemo = () => {
  return (
    <div>
      <Suspense fallback={
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}>
        <ImageTable></ImageTable>
      </Suspense>
      <Suspense fallback={
        <span className="sr-only">Loading model...</span>
      }>
        <ImageClassifier />
      </Suspense>
    </div>
  );
}

const SourceCode = () => {
  return (
    <div>
      <h3>Source Code:</h3>
      <ul>
        <li>
          <a href="https://github.com/michaelfong2017/cnn">https://github.com/michaelfong2017/cnn</a>
        </li>
        <li>
          <a href="https://github.com/michaelfong2017/darknet">https://github.com/michaelfong2017/darknet</a>
        </li>
        <li>
          <a href="https://github.com/michaelfong2017/tensorflow-yolov4-tflite">https://github.com/michaelfong2017/tensorflow-yolov4-tflite</a>
        </li>
        <li>
          <h5>custom.zip, which should be put in the darknet directory:</h5>
          <a href="https://yolo-darknet.s3.ap-east-1.amazonaws.com/custom.zip">https://yolo-darknet.s3.ap-east-1.amazonaws.com/custom.zip</a>
        </li>
      </ul>
    </div>
  );
}

const Proposal = () => {
  return (
    <div>
      <h3>Proposal:</h3>
      <ul>
        <a href="https://drive.google.com/file/d/1VbMdLoP5_Nad82MTSyDJS2lqGEdZra3A/view?usp=sharing">https://drive.google.com/file/d/1VbMdLoP5_Nad82MTSyDJS2lqGEdZra3A/view?usp=sharing</a>
      </ul>
    </div>
  );
}

const Powerpoint = () => {
  return (
    <div>
      <h3>Powerpoint:</h3>
      <ul>
        <a href="https://drive.google.com/file/d/1BIDoRuxwND-eO7Q7cIdbfROFVaTY1HUu/view?usp=sharing">https://drive.google.com/file/d/1BIDoRuxwND-eO7Q7cIdbfROFVaTY1HUu/view?usp=sharing</a>
      </ul>
    </div>
  );
}

export default hot(App);
