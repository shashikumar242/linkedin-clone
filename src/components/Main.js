import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <div>
      <Container>
        <h1>main</h1>
      </Container>
    </div>
  );
};

// styled-components

const Container = styled.div`
  grid-area: main;
`;

export default Main;
