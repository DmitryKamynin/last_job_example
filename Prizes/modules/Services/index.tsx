import Service from "@/utils/globalService";
import axios from "@/axios";
import PrizeType from "@/modules/Seasons/modules/Prizes/modules/Main/Model";
import { PrizeEditAddType } from "@/modules/Seasons/modules/Prizes/modules/EditAdd/Model";

class PrizeService extends Service<PrizeType[], PrizeEditAddType> {
  startRiffle = (body: any): Promise<ServerResponse> => {
    return axios.post("admin/prize/raffles", body);
  };
}

export default new PrizeService("admin/prizes");
