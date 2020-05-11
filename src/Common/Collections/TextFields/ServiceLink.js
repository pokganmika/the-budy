import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "0")};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  color: #676767;

  .auth-link {
    margin: 0 5px;
    text-decoration: none;
  }
`;

// TODO: By Signing up, ... || By Login, ...
const ServiceLink = ({ marginBottom }) => {
  return (
    <Container marginBottom={marginBottom}>
      By Signing up, I accept to
      <Link
        to="/terms-of-service"
        className="auth-link"
        style={{
          color: "#008695",
          fontWeight: "500"
        }}
      >
        Terms of Service
      </Link>
      <br />
      and
      <Link
        to="/privacy-policy"
        className="auth-link"
        style={{
          color: "#008695",
          fontWeight: "500"
        }}
      >
        Privacy Policy
      </Link>
      of this site.
    </Container>
  );
};

export default ServiceLink;
