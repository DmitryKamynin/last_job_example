import React, { lazy, Suspense } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@/UI/DialogTitle";
import DialogActions from "./widgets/DialogActions";
import DialogContent from "./widgets/DialogContent";
import Store from "../../../../ViewModel";
import SnackbarStore from "@/UI/Snackbar/ViewModel";
import { AppChild, Root } from "@/router/Namespase";

const SimpleDialog = lazy(() => import("@/UI/Dialogs/Simple"));
const RemoveQuestion = lazy(() => import("@/UI/Dialogs/Simple/RemoveQuestion"));

const CustomizedDialogs = (): JSX.Element | null => {
  const [showSimpleDialog, setShowSimpleDialog] =
    React.useState<boolean>(false);

  const handleClose = (): void => {
    Store.closePopup();
  };

  const handleOpenSimple = (): void => {
    setShowSimpleDialog(!showSimpleDialog);
  };

  const handleDelete = (): void => {
    if (Store.info && typeof Store.info.id === "number")
      Store.deleteOneItem(Store.info?.id).then(() => {
        SnackbarStore.onOpenWarn(
          `${Store.info?.special ? "Специальный" : "Основной"} приз удалён`
        );
      });
    handleClose();
  };

  if (Store.info && typeof Store.info.id === "number")
    return (
      <>
        <Dialog onClose={handleClose} open={!!Store.info}>
          <DialogTitle>Опции</DialogTitle>

          {!Store.info.has_active_raffle && <DialogContent />}

          <DialogActions
            onClose={handleClose}
            onDelete={handleOpenSimple}
            routeName={`${Root.app}.${AppChild.seasons}.${
              Store.info.special
                ? AppChild.special_prizes
                : AppChild.main_prizes
            }.${AppChild.edit}`}
          />

          <Suspense fallback={null}>
            <SimpleDialog
              onClose={handleOpenSimple}
              onConfirmation={handleDelete}
              onCancel={handleOpenSimple}
              open={showSimpleDialog}
              body={
                <Suspense fallback={null}>
                  <RemoveQuestion />
                </Suspense>
              }
            />
          </Suspense>
        </Dialog>
      </>
    );
  return null;
};

export default CustomizedDialogs;
