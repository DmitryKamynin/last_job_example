import { makeAutoObservable } from "mobx";
import Service from "../../Services";
import { PrizeEditAddType } from "../Model";
import EditAddViewModelTemplate from "@/utils/editAddViewModelTemplate";

const defaultState: PrizeEditAddType = {
  info: {
    text_after_close: "",
    position: "",
    name: "",
    lower_name: "",
    description: "",
    popup_mobile_counter_days: "",
    popup_mobile_isShow: false,
    prize_behavior: "",
    manual_creation_sum: "",
    manual_creation_text_popup: "",
  },
  image: "",
  visible: false,
  win_notifications: {
    sms: {
      text: "",
    },
    email: {
      text: "",
    },
    push: {
      push_category: "",
      text: "",
    },
  },
  price_rub: "",
  "4000_limited": false,
  has_active_raffle: false,
  winners_formula: "byQuantity",
  winners_amount: "",
  active_days: "",
  days_close_after_end: "",
  special: false,
};

const Store = makeAutoObservable(
  new EditAddViewModelTemplate(Service, defaultState)
);
export default Store;
