import UI from "@/UI";
import GetCrumbs from "@/utils/getCrumbs";
import routerMainPrizes from "@/router/App/Seasons/MainPrizes";
import routerSpecialPrizes from "@/router/App/Seasons/SpecialPrizes";

import MainPrizesRouter from "./prizes.router";

const MainPrizes = ({ special }: { special: boolean }): JSX.Element => (
  <UI.Page>
    <UI.Nav
      crumbs={
        GetCrumbs(special ? [routerSpecialPrizes] : [routerMainPrizes]).crumbs
      }
    />
    <MainPrizesRouter special={special} />
  </UI.Page>
);

export default MainPrizes;
