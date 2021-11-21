import { observer } from "mobx-react-lite";
import { lazy, Suspense, useCallback } from "react";
import UI from "@/UI";
import Column from "@/UI/Table/widgets/Column";
import useSettingsTable from "@/UI/Table/hook/useSettingsTable";
import ButtonAppend from "@/UI/Button/ButtonAppend";
import Settings from "@/UI/Dialogs/Settings";
import { AppChild, Root } from "@/router/Namespase";
import SwitchCustom from "@/UI/Form/Switch";
import Store from "../ViewModel";
import imageUrl from "@/utils/imageUrl";
import PrizeType from "../Model";

const Dialog = lazy(() => import("./widgets/Dialog/Views"));

const Edit = observer(({ special }: { special: boolean }): JSX.Element => {
  const tableSettings = useSettingsTable({
    title: `${special ? "Специальные" : "Основные"} призы`,
    rows: Store.rows,
    request: useCallback(
      (val) => {
        // eslint-disable-next-line no-param-reassign
        val.filters = { special };
        return Store.getDataTable(val);
      },
      [special]
    ),
  });

  return (
    <>
      <ButtonAppend
        routeName={`${Root.app}.${AppChild.seasons}.${
          special ? AppChild.special_prizes : AppChild.main_prizes
        }.${AppChild.add}`}
        title="Добавить приз"
      />
      <UI.DataGrid settings={tableSettings}>
        <Column
          name="image"
          title="Изображение"
          resolver={useCallback(
            (image: PrizeType["image"]): JSX.Element => (
              <img
                width="110px"
                src={imageUrl(image as string)}
                alt="prize.img"
              />
            ),
            []
          )}
        />
        <Column
          name="position"
          title="Позиция"
          resolverFull={(item: PrizeType): string => item.info?.position ?? ""}
        />
        <Column
          name="name"
          title="Название"
          resolverFull={(item: PrizeType): string => item.info?.name ?? ""}
        />
        <Column
          name="lower_name"
          title="Название нижнее"
          resolverFull={(item: PrizeType): string =>
            item.info?.lower_name ?? ""
          }
        />
        <Column
          name="price"
          title="Цена"
          resolverFull={(item: PrizeType): string => item.price_rub}
        />
        <Column
          name="visible"
          title="Активно"
          resolverFull={useCallback(
            (item: PrizeType): JSX.Element => (
              <SwitchCustom
                disabled={item.visible === "loading"}
                checked={item.visible as boolean}
                onChange={(): void => {
                  Store.changeFlag(item, "visible");
                }}
              />
            ),
            []
          )}
        />
        <Column
          name="isShowWinners"
          title="Показывать в победителях"
          resolverFull={useCallback(
            (item: PrizeType): JSX.Element => (
              <SwitchCustom
                disabled={item.is_show_winners === "loading"}
                checked={item.is_show_winners as boolean}
                onChange={(): void => {
                  Store.changeFlag(item, "is_show_winners");
                }}
              />
            ),
            []
          )}
        />
        <Column
          name="actions"
          title="Действия"
          resolverFull={useCallback(
            (item: PrizeType): JSX.Element => (
              <Settings actionToOpen={(): void => Store.openPopup(item)} />
            ),
            []
          )}
        />
      </UI.DataGrid>

      {Store.info && (
        <Suspense fallback={null}>
          <Dialog />
        </Suspense>
      )}
    </>
  );
});
export default Edit;
