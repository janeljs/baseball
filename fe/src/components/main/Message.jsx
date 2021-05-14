import styled from "styled-components";

const Message = () => {
  return <MessageTxt>참가할 게임을 선택하세요!</MessageTxt>;
};

export default Message;

const MessageTxt = styled.h3`
  padding: 40px;
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  text-align: center;
`;
