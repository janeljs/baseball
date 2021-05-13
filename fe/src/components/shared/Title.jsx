import styled from "styled-components";

const Title = ({ isMain }) => {
  return <Heading isMain={isMain}>BASEBALL GAME ONLINE</Heading>;
};

export default Title;

const Heading = styled.h1`
  padding: ${({ isMain }) => (isMain ? "40px" : "40px 0 10px")};
  font-size: ${({ isMain }) => (isMain ? "50px" : "35px")};
  font-weight: 900;
  color: #eee;
  text-align: center;
`;
