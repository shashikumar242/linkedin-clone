import React from "react";
import styled from "styled-components";

const Rightside = () => {
  return (
    <div>
      <Container>
        <h1>right side</h1>
      </Container>
    </div>
  );
};

// styled-components

const Container = styled.div`
  grid-area: rightside;
`;

export default Rightside;
