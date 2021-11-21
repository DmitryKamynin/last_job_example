import Button from "@material-ui/core/Button";
import IconDelete from "@material-ui/icons/Delete";
import IcnEdit from "@material-ui/icons/Edit";
import styled from "styled-components";
import Store from "../../../../../../ViewModel";
import UILink from "@/UI/Link";
import DialogActions from "@/UI/DialogActions";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Actions = ({
  onClose,
  onDelete,
  routeName,
}: {
  onClose: any;
  onDelete: any;
  routeName: string;
}): JSX.Element => (
  <DialogActions>
    <Wrapper>
      <Button
        startIcon={<IconDelete />}
        onClick={onDelete}
        color="secondary"
        size="small"
      >
        Удалить
      </Button>
      <UILink
        routeName={routeName}
        routeParams={{ id: Store.info!.id }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button
          style={{ marginLeft: "15px" }}
          onClick={onClose}
          startIcon={<IcnEdit />}
          color="inherit"
          size="small"
        >
          Редактировать
        </Button>
      </UILink>
    </Wrapper>
    <Button onClick={onClose} color="primary">
      Закрыть
    </Button>
  </DialogActions>
);

export default Actions;
