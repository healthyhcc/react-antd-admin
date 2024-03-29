import React, { useState } from "react";
import { Spin, Card, Input, DatePicker, Space, Button, message } from "antd";
import { useIntl } from "react-intl";
import { useRequest } from "ahooks";
import { addScheduleJob, cancelScheduleJob } from "@/api/schedule";
import { EmailRegexp } from "@/utils";

type AddScheduleType = {
  scheduled: string;
  email: string | undefined;
};
type DateArrayType = Array<string>;
const Schedule = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [scheduled, setScheduled] = useState<string>("26 * * * * *");
  const typeArray: DateArrayType = ["month", "week", "date", "time"];
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

  const handleInputEmail = (event: any) => {
    const emailValue = event.target.value;
    if (emailValue && EmailRegexp.test(emailValue)) {
      setEmail(emailValue);
    } else {
      message.warning(formatMessage("schedule.input_email"));
    }
  };
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
      <Card
        title={formatMessage("menulist.schedule")}
        style={{ height: "calc(100vh - 100px - 2rem)" }}
      >
        <div>{formatMessage("schedule.tips")}</div>
        <div>
          <Input
            type="email"
            onBlur={handleInputEmail}
            placeholder={formatMessage("menulist.placeholder_email")}
            className="w-1/4 mt-4"
          />
        </div>
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
          <Button onClick={handleAddScheduleJob}>
            {formatMessage("schedule.add_schedule_job")}
          </Button>
          <Button onClick={handleCancelScheduleJob}>
            {formatMessage("schedule.cancel_schedule_job")}
          </Button>
        </Space>
      </Card>
    </Spin>
  );
};

export default Schedule;
