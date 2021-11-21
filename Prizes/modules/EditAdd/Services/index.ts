import axios from "@/axios";

const EditAddGroup = (
  main_prize_id: number,
  ids: number[],
  group_id?: number
): Promise<ServerResponse> => {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append("ids", `${id}`));
  params.append("main_prize_id", `${main_prize_id}`);
  if (group_id) params.append("group_id", `${group_id}`);

  return axios.put("admin/prizes/group", undefined, {
    params,
  });
};

export default {
  EditAddGroup,
};
