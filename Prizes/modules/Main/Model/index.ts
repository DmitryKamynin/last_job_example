type WinNotification = {
  sms: {
    text: string;
  };
  email: {
    text: string;
  };
  push: {
    text: string;
    push_category: string;
  };
};

type InfoField = {
  position?: string;
  grouping?: any[];
  description?: string;
  lower_name?: string;
  name?: string;
  prize_behavior?: string;
  popup_mobile_counter_days?: string;
  popup_mobile_isShow?: boolean;
  manual_creation_sum: string;
  manual_creation_text_popup: string;
  text_after_close: string;
};

type PrizeType = {
  id?: number;
  "4000_limited": boolean;
  active_days: string;
  active_raffle: string;
  days_close_after_end: string;
  visible: boolean | "loading";
  group_id?: any;
  has_certificates: boolean;
  has_active_raffle: boolean;
  image: string | File;
  info: InfoField;
  is_show_winners: boolean | "loading";
  price_rub: string;
  special: boolean;
  win_notifications: WinNotification;
  winners_amount: string;
  winners_formula: string;
};

export default PrizeType;
