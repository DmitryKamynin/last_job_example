import React from "react";
import styled from "styled-components";
import Row from "@/UI/Dialogs/Row";
import UI from "@/UI";
import EdgeInsets from "@/utils/edge";
import UploadFile from "@/UI/Upload/InputSelect";
import ViewModel from "../../../../../../ViewModel";

const Title = styled.p`
  margin: 0 0 20px 0;
  color: #626262;
  font-size: 15px;
`;

const SuperPrize = (): JSX.Element => {
  // const { superPrize } = ViewModel.info as MainPrizesRowType;

  return (
    <Row>
      <div>
        {/* <Title>Всего накопленно призов: {superPrize?.counter}</Title> */}
        <UI.Container padding={EdgeInsets.symmetric({ vertical: 8 })}>
          <UploadFile onChange={(): void => {}} />
        </UI.Container>
      </div>
    </Row>
  );
};

export default SuperPrize;
