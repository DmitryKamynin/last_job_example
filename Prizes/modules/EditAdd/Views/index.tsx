import { useEffect } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useRoute } from "react-router5";
import Loader from "@/UI/Loader";
import PrizeTabs from "./widgets/Tabs";
import Store from "../ViewModel";
import { PrizeEditAddType } from "@/modules/Seasons/modules/Prizes/modules/EditAdd/Model";
import imagePreRequest from "@/utils/imagePrerequest";
import SnackbarStore from "@/UI/Snackbar/ViewModel";
import router from "@/router";
import { AppChild, Root } from "@/router/Namespase";
import toBase64 from "@/utils/toBase64";
import Services from "../Services";

const Edit = observer(
  ({
    special,
    page,
  }: {
    special: boolean;
    page: "edit" | "add";
    // eslint-disable-next-line sonarjs/cognitive-complexity
  }): JSX.Element => {
    const { route } = useRoute();
    const { id } = route.params;

    useEffect(() => {
      if (page === "edit") Store.getItem(id);
      return (): void => Store.resetData();
    }, [id, page]);

    const formik = useFormik<PrizeEditAddType>({
      initialValues: Store.data,
      enableReinitialize: true,
      onSubmit: async (val, api) => {
        const data = { ...val, special };

        if (!data.group_id && data.info.grouping) {
          await Services.EditAddGroup(
            Store.data.id as number,
            data.info.grouping
          );
        }
        if (
          data.group_id &&
          formik.initialValues.info.grouping !== formik.values.info.grouping
        ) {
          await Services.EditAddGroup(
            Store.data.id as number,
            data.info.grouping!,
            Store.data.group_id
          );
        }

        if (data.image instanceof File) {
          const base64 = await toBase64(data.image);
          const [imageId] = await imagePreRequest(base64);
          data.image = imageId;
        }

        await Store.actionOnItem(page, data, id).then(() => {
          SnackbarStore.onOpen(
            `${special ? "Специальный" : "Основной"} приз ${
              page === "edit" ? "отредактирован" : "создан"
            }`
          );
          router.navigate(
            `${Root.app}.${AppChild.seasons}.${
              special ? AppChild.special_prizes : AppChild.main_prizes
            }`
          );
        });
        api.setSubmitting(false);
      },
    });

    return Store.isLoading ? (
      <Loader top />
    ) : (
      <PrizeTabs special={special} formik={formik} />
    );
  }
);

export default Edit;
