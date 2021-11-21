import Typography from "@material-ui/core/Typography";
import React from "react";

const CreationPopupInfo = (): JSX.Element => (
  <div style={{ marginBottom: "16px", marginLeft: "8px" }}>
    <Typography>Текст попапа при наборе всей суммы SUM</Typography>
    <Typography>
      <b>[date_end]</b> - Дата окончания проведения розыгрыша. Формат
      отображения - `25 июня`
    </Typography>
  </div>
);

export default CreationPopupInfo;
