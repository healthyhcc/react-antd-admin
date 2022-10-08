import React, { useState } from "react";
import { Spin, Card, DatePicker, Space, Button, message } from "antd";
import { useIntl } from "react-intl";
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
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };

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
        message.success(formatMessage("message.add.success"));
      })
      .catch((error) => {
        console.log(error);
        message.error(formatMessage("message.add.error"));
      });
  };
  const handleCancelScheduleJob = () => {
    runCancelScheduleJob()
      .then(() => {
        message.success(formatMessage("message.cancel.success"));
      })
      .catch((error) => {
        console.log(error);
        message.error(formatMessage("message.cancel.error"));
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
      <Card title={formatMessage("menulist.schedule")}>
        <div>{formatMessage("menulist.schedule.tooltip")}</div>
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
          <Button onClick={handleAddScheduleJob}>{formatMessage("menulist.add_schedule_job")}</Button>
          <Button onClick={handleCancelScheduleJob}>{formatMessage("menulist.cancel_schedule_job")}</Button>
        </Space>
      </Card>
    </Spin>
  );
};

export default Schedule;
