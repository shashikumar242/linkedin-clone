import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <div>
      <Container>
        <ShareBox>share</ShareBox>
        
      </Container>
    </div>
  );
};

// styled-components

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
    
    

`;

const ShareBox = styled(CommonCard)`
  
`;




export default Main;
