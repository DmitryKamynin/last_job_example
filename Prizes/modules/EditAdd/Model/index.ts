import { FormikProps } from "formik";
import { ChangeEvent } from "react";
import numberFieldValidation from "@/utils/numberFieldValidation";
import PrizesList from "@/hooks/MainSpecPrizes/ViewModel";
import PrizeType from "../../Main/Model";
import PushNotificationCategories from "@/hooks/useApi/PushNotificationCategory/Categories/ViewModel";

export type PrizeEditAddType = Omit<
  PrizeType,
  "has_certificates" | "is_show_winners" | "active_raffle"
>;

// ТАБ ОСНОВНЫЕ ДАННЫЕ
const MainFields = (
  formik: FormikProps<PrizeEditAddType>,
  special: boolean
  // eslint-disable-next-line sonarjs/cognitive-complexity
): any => [
  {
    s: 6,
    type: "image",
    name: "images",
    width: "192px",
    image: formik.values.image,
    onChange: async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (e.target.files?.[0]) {
        formik.setFieldValue("image", e.target.files?.[0]);
      }
    },
  },
  {
    s: 6,
    type: "default",
    label: "Позиция для вывода",
    name: "info.position",
    value: formik.values?.info?.position ?? "",
    onChange: numberFieldValidation(formik),
    error: !!formik.errors.info?.position && !!formik.touched.info?.position,
  },
  {
    s: 6,
    type: "multiselect",
    label: "Группировка",
    name: "info.grouping",
    defaultValue:
      PrizesList[special ? "spec" : "main"]
        .map((item) => ({
          name: `${item.name} (${item.lower_name})`,
          value: item.value,
        }))
        .filter((item) =>
          formik.values.group_id?.items?.find(
            (elem: any) => elem.prize_id === item.value
          )
        ) ?? [],
    onChange: (x: any, value: any): void => {
      formik.setFieldValue(
        "info.grouping",
        value.map((item: any): number => item.value)
      );

      const data: any[] = [];

      value.forEach((item: any) => {
        data.push({
          prize_id: item.value,
        });
      });

      formik.setFieldValue("group_id.items", data);
    },
    list: PrizesList[special ? "spec" : "main"].map((item) => ({
      name: `${item.name} (${item.lower_name})`,
      value: item.value,
    })),
    getList: (): Promise<void> =>
      PrizesList[special ? "getAllSpec" : "getAllMain"](),
  },
  {
    s: 6,
    type: "default",
    label: "Название",
    name: "info.name",
    value: formik.values?.info?.name ?? "",
    onChange: formik.handleChange,
    error: !!formik.errors.info?.name && !!formik.touched.info?.name,
  },
  {
    s: 6,
    type: "default",
    label: "Название нижнее",
    name: "info.lower_name",
    value: formik.values?.info?.lower_name ?? "",
    onChange: formik.handleChange,
    error:
      !!formik.errors.info?.lower_name && !!formik.touched.info?.lower_name,
  },
  {
    s: 6,
    type: "default",
    label: "Текст в случае закрытия приза",
    name: "info.text_after_close",
    value: formik.values?.info?.text_after_close ?? "",
    onChange: formik.handleChange,
    error:
      !!formik.errors.info?.text_after_close &&
      !!formik.touched.info?.text_after_close,
  },
  {
    s: 6,
    type: "default",
    label: "Описание",
    name: "info.description",
    multiline: true,
    rows: 3,
    maxRows: 3,
    value: formik.values?.info?.description ?? "",
    onChange: formik.handleChange,
    error:
      !!formik.errors.info?.description && !!formik.touched.info?.description,
  },
  {
    s: 6,
    type: "radio",
    label: "Активировать приз на сайте",
    name: "visible",
    value: formik.values?.visible ?? false,
    onChange: formik.setFieldValue,
    items: [
      { value: false, name: "Не активировать" },
      { value: true, name: "Активировать" },
    ],
  },
];

// ТАБ УВЕДОМЛЕНИЯ
const NotificationFields = (formik: FormikProps<PrizeEditAddType>): any => [
  {
    s: 6,
    type: "default",
    label: "Текст в случае выйгрыша - СМС",
    name: "win_notifications.sms.text",
    multiline: true,
    rows: 3,
    maxRows: 3,
    value: formik.values?.win_notifications?.sms?.text ?? "",
    onChange: formik.handleChange,
  },
  {
    s: 6,
    type: "default",
    label: "Текст в случае выйгрыша - Пуш сообщение",
    name: "win_notifications.email.text",
    multiline: true,
    rows: 3,
    maxRows: 3,
    value: formik.values?.win_notifications?.email?.text ?? "",
    onChange: formik.handleChange,
  },
  {
    s: 6,
    type: "default",
    label: "Текст в случае выйгрыша - Пуш заголовок",
    name: "win_notifications.push.text",
    value: formik.values?.win_notifications?.push?.text ?? "",
    onChange: formik.handleChange,
  },
  {
    s: 6,
    type: "select",
    label: "Категории пуша",
    name: "win_notifications.push.push_category",
    onChange: formik.setFieldValue,
    value: formik.values?.win_notifications?.push?.push_category ?? "",
    items: PushNotificationCategories.info,
    getList: (): Promise<void> => PushNotificationCategories.getCategories(),
  },
];

// ТАБ ДОП. НАСТРОЙКИ
const OptionsFields = (formik: FormikProps<PrizeEditAddType>): any => [
  {
    s: 6,
    type: "radio",
    label: "Условие лимита на 4000",
    name: "4000_limited",
    onChange: formik.setFieldValue,
    value: formik.values["4000_limited"] ?? false,
    items: [
      { value: false, name: "Нет лимита" },
      { value: true, name: "Есть лимит на 4000" },
    ],
  },
  {
    s: 6,
    disabled: !formik.values["4000_limited"],
    type: "default",
    label: "Цена (влияет на условие лимита по 4000)",
    name: "price_rub",
    value: formik.values.price_rub ?? "",
    onChange: numberFieldValidation(formik, true),
    error: !!formik.errors.price_rub && !!formik.touched.price_rub,
  },
  {
    s: 6,
    type: "select",
    label: "Формула определения победителя",
    name: "winners_formula",
    onChange: formik.setFieldValue,
    value: formik.values.winners_formula ?? "byQuantity",
    items: [
      { value: "byQuantity", name: "По кол-ву победителей" },
      { value: "byUSD", name: "По коэф. USD" },
    ],
  },
  {
    s: 12,
    type: "text",
    name: "popupTitle",
    text: "Попап в мобильном приложении для оставления отзыва",
  },
  {
    s: 6,
    type: "default",
    label: "Кол-во дней после которых откроется попап для оставления отзыва",
    name: "info.popup_mobile_counter_days",
    value: formik.values.info?.popup_mobile_counter_days ?? "",
    onChange: numberFieldValidation(formik, true),
    error:
      !!formik.errors.info?.popup_mobile_counter_days &&
      !!formik.touched.info?.popup_mobile_counter_days,
  },
  {
    s: 6,
    type: "radio",
    label: "Показывать ли попап для оставления отзыва при получении приза",
    name: "info.popup_mobile_isShow",
    onChange: formik.setFieldValue,
    value: formik.values.info?.popup_mobile_isShow ?? false,
    items: [
      { value: false, name: "Не показывать" },
      { value: true, name: "Показывать" },
    ],
  },
];

// ТАБ НАСТРОЙКИ СОЗДАНИЯ
const CreationOptionsFields = (formik: FormikProps<PrizeEditAddType>): any => ({
  main: [
    {
      s: 6,
      type: "select",
      label: "Поведение приза после срока окончания розыгрыша",
      name: "info.prize_behavior",
      onChange: formik.setFieldValue,
      value: formik.values?.info?.prize_behavior ?? "manual_creation",
      items: [
        {
          value: "manual_creation",
          name: "Новый приз надо будет создавать вручную",
        },
        {
          value: "auto_creation",
          name: "Создаётся автоматически с параметрами ниже",
        },
        {
          value: "manual_creation_after_days",
          name: "Создается вручную и заканчивается через N дней после накопления суммы SUM",
        },
      ],
    },
  ],
  auto_creation: [
    {
      s: 6,
      type: "default",
      label: "Кол-во победителей",
      name: "winners_amount",
      value: formik.values.winners_amount ?? "",
      onChange: numberFieldValidation(formik),
      error: !!formik.errors.winners_amount && !!formik.touched.winners_amount,
    },
    {
      s: 6,
      type: "default",
      label: "Кол-во дней начиная от даты создания приза",
      name: "active_days",
      value: formik.values.active_days ?? "",
      onChange: numberFieldValidation(formik),
      error: !!formik.errors.active_days && !!formik.touched.active_days,
    },
  ],
  manual_creation_after_days: [
    {
      type: "text",
      name: "creationTitle",
      text: "Создается вручную и заканчивается через N дней после накопления суммы SUM",
    },
    {
      s: 6,
      type: "default",
      label: "N дней после накопления суммы",
      name: "days_close_after_end",
      value: formik.values.days_close_after_end ?? "",
      onChange: numberFieldValidation(formik),
      error:
        !!formik.errors.days_close_after_end &&
        !!formik.touched.days_close_after_end,
    },
    {
      s: 6,
      type: "default",
      label: "Сумма",
      name: "info.manual_creation_sum",
      value: formik.values.info?.manual_creation_sum ?? "",
      onChange: numberFieldValidation(formik),
      error:
        !!formik.errors.info?.manual_creation_sum &&
        !!formik.touched.info?.manual_creation_sum,
    },
    {
      s: 6,
      type: "texteditor",
      name: "info.manual_creation_text_popup",
      value: formik.values.info?.manual_creation_text_popup,
      onChange: formik.setFieldValue,
    },
  ],
});

export default {
  MainFields,
  NotificationFields,
  OptionsFields,
  CreationOptionsFields,
};
