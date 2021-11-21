import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Element from "@/UI/Form";
import Store from "../../../../../../ViewModel";

const WrapperDate = styled.div`
  margin-top: 20px;

  .MuiFormControl-root {
    margin-bottom: 15px;
  }
  .MuiOutlinedInput-input {
    padding: 10.5px 14px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: left;
`;

const Title = styled.p`
  margin: 0;
  color: #626262;
  font-size: 15px;
  margin-right: 20px;
`;

const CustomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomButton = styled(Button)``;

const LaunchPromotion = (): JSX.Element => {
  const [firstDate, setFirstDate] = useState("01.01.2022");
  const [counter, setCounter] = useState("");

  const behavior = Store.info?.info?.prize_behavior;

  const FirstDateHandler = (field: string, value: any): any => {
    setFirstDate(value);
  };

  const ClickHandler = (): void => {
    const date = firstDate.split(".");
    const formatDate = `${date[2]}-${date[1]}-${date[0]}`;

    Store.startRiffle({
      end_date: formatDate,
      prize_id: Store.info?.id,
      winners_amount: +counter,
    });
  };

  const CounterHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCounter(event.target.value);
  };

  return (
    <CustomRow>
      <div>
        <Title>Запустить новую акцию</Title>
        <WrapperDate>
          {behavior !== "manual_creation_after_days" && (
            <>
              <Element.DatePick
                format="DD.MM.yyyy"
                variant="inline"
                name="date"
                label="Окончание программы"
                onChange={FirstDateHandler}
                value={firstDate}
              />
              <Element.Field
                name="counter"
                label="Кол-во победителей"
                value={counter}
                onChange={CounterHandler}
              />
            </>
          )}
          <ButtonsWrapper>
            <CustomButton
              size="medium"
              variant="outlined"
              color="primary"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={ClickHandler}
            >
              Запустить
            </CustomButton>
          </ButtonsWrapper>
        </WrapperDate>
      </div>
    </CustomRow>
  );
};

export default LaunchPromotion;
