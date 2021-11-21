import React, { lazy, Suspense } from "react";
import DialogContent from "@/UI/DialogContent";
import Store from "../../../../../../ViewModel";

const LaunchPromotion = lazy(() => import("../LaunchPromotion"));
const SuperPrize = lazy(() => import("../SuperPrize"));

const DialogContentCustom = (): JSX.Element => {
  // const { superPrize } = Store.info as MainPrizesRowType;
  return (
    <DialogContent>
      <Suspense fallback={null}>
        <LaunchPromotion />
        {/* {superPrize?.counter ? <SuperPrize /> : <LaunchPromotion />} */}
      </Suspense>
    </DialogContent>
  );
};

export default DialogContentCustom;
