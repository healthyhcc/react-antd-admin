import request from "@/utils/request";

export const addScheduleJob = (data: object) => {
  return request({
    url: "/schedule/addScheduleJob",
    method: "post",
    data,
  });
};

export const cancelScheduleJob = () => {
  return request({
    url: "/schedule/cancelScheduleJob",
    method: "post",
  });
};
