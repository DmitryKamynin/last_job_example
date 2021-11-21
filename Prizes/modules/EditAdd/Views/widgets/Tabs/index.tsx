import React, { useState, ChangeEvent, memo } from "react";
import Tab from "@material-ui/core/Tab";
import { observer } from "mobx-react-lite";
import Tabs from "@material-ui/core/Tabs";
import Template from "@/UI/Form/Template";
import NotificationInfo from "../NotificationInfo";
import Fields from "../../../Model";
import CreationPopupInfo from "@/modules/Seasons/modules/Prizes/modules/EditAdd/Views/widgets/CreationPopupInfo";

const TabList: any = [
  {
    key: 0,
    label: "Основные данные",
  },
  {
    id: 1,
    label: "Уведомления",
  },
  {
    id: 2,
    label: "Доп.настройки",
  },
  {
    id: 3,
    label: "Настройки создания",
  },
];

const PrizeTabs = observer(
  ({ formik, special }: { formik: any; special: boolean }): JSX.Element => {
    const [currentValue, setCurrentValue] = useState<number>(0);

    const handleChange = (
      event: ChangeEvent<Record<string, never>>,
      newValue: number
    ): void => {
      setCurrentValue(newValue);
    };
    const fieldsProvider = (): any[] => {
      switch (currentValue) {
        case 0:
          return Fields.MainFields(formik, special);
        case 1:
          return Fields.NotificationFields(formik);
        case 2:
          return Fields.OptionsFields(formik);
        case 3: {
          const creationFields = Fields.CreationOptionsFields(formik);
          if (formik.values?.info?.prize_behavior !== "manual_creation") {
            return creationFields.main.concat(
              creationFields[formik.values?.info?.prize_behavior] ?? []
            );
          }
          return creationFields.main;
        }
        default:
          return [];
      }
    };

    return (
      <>
        <Tabs
          value={currentValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          {TabList.map((item: any) => (
            <Tab key={`${item.id}`} label={item.label} />
          ))}
        </Tabs>
        <Template
          formik={formik}
          fields={fieldsProvider()}
          bottomChildren={
            <>
              {currentValue === 3 &&
                formik.values?.info?.prize_behavior ===
                  "manual_creation_after_days" && <CreationPopupInfo />}
            </>
          }
        >
          {currentValue === 1 ? <NotificationInfo /> : null}
        </Template>
      </>
    );
  }
);

export default memo(PrizeTabs);
