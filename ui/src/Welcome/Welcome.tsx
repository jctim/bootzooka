import React from "react";
// import logo from "./sml_2.png";
// import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

const Welcome: React.FC = () => (
  <>
    <Container fluid className="py-5 bg-primary text-light text-center">
      <h3>Hi there! Welcome to Bootzooka!</h3>
      <p>In this template application you can register as a new user, log in and later manage your user details.</p>
    </Container>
    <Container className="py-5">
      <p>
        If you are interested in how Bootzooka works, you can{" "}
        <a href="http://softwaremill.github.io/bootzooka/" target="blank">
          browse the documentation
        </a>
        , or the{" "}
        <a href="https://github.com/softwaremill/bootzooka" target="blank">
          source code
        </a>
        .
      </p>

      <small>brought to you by</small>
      <a href="http://softwaremill.com" rel="noopener noreferrer" target="_blank">
        {/* <Image className="sm-3" fluid src={logo} alt="SoftwareMill" /> */}
      </a>
    </Container>
  </>
);

export default Welcome;
