import React, { useState } from "react";
import { Spin, Card, DatePicker, Space, Button, message } from "antd";
import { useRequest } from "ahooks";
import { addScheduleJob, cancelScheduleJob } from "@/api/schedule";

type AddScheduleType = {
  scheduled: string;
  email: string;
};
const Schedule = () => {
  const email = "healthyhcc@gmail.com";
  const [scheduled, setScheduled] = useState("26 * * * * *");
  const typeArray = ["month", "week", "date", "time"];

  const { loading: loadingAddSchedule, runAsync: runAddScheduleJob } =
    useRequest((params: AddScheduleType) => addScheduleJob(params), {
      manual: true,
      throttleWait: 1000,
    });
  const { loading: loadingCancelSchedule, runAsync: runCancelScheduleJob } =
    useRequest(cancelScheduleJob, { manual: true, throttleWait: 1000 });

  const handleAddScheduleJob = () => {
    const params = { scheduled, email };
    runAddScheduleJob(params)
      .then(() => {
        message.success("添加成功");
      })
      .catch((error) => {
        console.log(error);
        message.error("添加失败");
      });
  };
  const handleCancelScheduleJob = () => {
    runCancelScheduleJob()
      .then(() => {
        message.success("取消成功");
      })
      .catch((error) => {
        console.log(error);
        message.error("取消失败");
      });
  };
  const handleDatePickerChange = (_: any, dateString: any, type: any) => {
    let datePickerString = dateString;
    switch (type) {
      case "month":
        if (datePickerString === "") {
            datePickerString = "*-*";
        }
        const month = datePickerString.split("-")[1];
        const scheduledMonthArray = scheduled.split(" ");
        scheduledMonthArray[4] = month;
        const monthResult = scheduledMonthArray.toString().replaceAll(",", " ");
        setScheduled(monthResult);
        break;
      case "week":
        if (datePickerString === "") {
            datePickerString = "*-*";
        }
        const week = datePickerString.split("-")[1].slice(0, 2);
        const scheduledWeekArray = scheduled.split(" ");
        scheduledWeekArray[5] = week;
        const weekResult = scheduledWeekArray.toString().replaceAll(",", " ");
        setScheduled(weekResult);
        break;
      case "date":
        if (datePickerString === "") {
            datePickerString = "*-*-*";
        }
        const date = datePickerString.split("-")[2];
        const scheduledDateArray = scheduled.split(" ");
        scheduledDateArray[3] = date;
        const dateResult = scheduledDateArray.toString().replaceAll(",", " ");
        setScheduled(dateResult);
        break;
      case "time":
        if (datePickerString === "") {
            datePickerString = "*:*:*";
        }
        const time = datePickerString.split(":");
        const scheduledTimeArray = scheduled.split(" ");
        scheduledTimeArray[2] = time[0];
        scheduledTimeArray[1] = time[1];
        scheduledTimeArray[0] = time[2];
        const timeResult = scheduledTimeArray.toString().replaceAll(",", " ");
        setScheduled(timeResult);
        break;
      default:
        setScheduled("26 * * * * *");
        break;
    }
  };
  return (
    <Spin spinning={loadingAddSchedule || loadingCancelSchedule}>
      <Card title="定时任务">
        <div>默认是每月每周每天每时每分每秒执行。</div>
        <Space className="mt-4 mr-4">
          {typeArray.map((type: any) => (
            <DatePicker
              key={type}
              picker={type}
              onChange={(_: any, dateString: any) =>
                handleDatePickerChange(_, dateString, type)
              }
            />
          ))}
        </Space>
        <Space>
          <Button onClick={handleAddScheduleJob}>添加定时任务</Button>
          <Button onClick={handleCancelScheduleJob}>取消定时任务</Button>
        </Space>
      </Card>
    </Spin>
  );
};

export default Schedule;
