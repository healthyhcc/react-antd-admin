import React, { useState } from "react";
import { Spin, Card, Tabs, List, Upload, Space, Button, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { useRequest } from "ahooks";
import { formatGMTTime } from "@/utils";
import { SERVER_ADDRESS } from "@/utils/config";
import {
  uploadMultipleFile,
  getAllFileList,
  getMyUploadList,
  deleteSingleFile,
  deleteAllFile,
} from "@/api/file";

interface DeleteFileType {
  id: number;
  name: string;
}
interface FileType extends DeleteFileType {
  original: string;
  time: string;
}
interface MultipleDeleteFileType {
  deleteParams: Array<DeleteFileType>;
}
type FileListType = Array<any>;
const FileAdmin: React.FC = () => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadFileList, setUploadFileList] = useState<FileListType>([]);
  const [fileList, setFileList] = useState<FileListType>([]);
  const [myUploadList, setMyUploadList] = useState<FileListType>([]);
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const { loading: loadingMultipleFile, runAsync: runUploadMultipleFile } =
    useRequest((params: object) => uploadMultipleFile(params), {
      manual: true,
      throttleWait: 1000,
    });
  const { loading: loadingGetAllFileList, runAsync: runGetAllFileList } =
    useRequest(getAllFileList, { manual: true, throttleWait: 1000 });
  const { loading: loadingGetMyUploadList, runAsync: runGetMyUploadList } =
    useRequest(getMyUploadList, { manual: true, throttleWait: 1000 });
  const { loading: loadingDeleteSingleFile, runAsync: runDeleteSingleFile } =
    useRequest((params: DeleteFileType) => deleteSingleFile(params), {
      manual: true,
      throttleWait: 1000,
    });
  const { loading: loadingDeleteAllFile, runAsync: runDeleteAllFile } =
    useRequest((params: MultipleDeleteFileType) => deleteAllFile(params), {
      manual: true,
      throttleWait: 1000,
    });

  const handleBeforeUploadFile = (fileList: Array<object>) => {
    const uploadFileListData: any = [...uploadFileList, ...fileList];
    setUploadFileList(uploadFileListData);
    return false;
  };
  const handleRemoveFile = (file: any) => {
    const index = uploadFileList.findIndex(
      (item: any) => item.uid === file.uid
    );
    const newUploadFileList = uploadFileList.slice();
    newUploadFileList.splice(index, 1);
    setUploadFileList(newUploadFileList);
  };
  const handleUploadFileList = () => {
    setUploading(true);

    const formData = new FormData();
    uploadFileList.forEach((file) => {
      formData.append("files", file);
    });

    runUploadMultipleFile(formData)
      .then(() => {
        setUploadFileList([]);
        message.success(formatMessage("file_admin.upload_success"));
      })
      .catch((error) => {
        console.log(error);
        message.error(formatMessage("file_admin.upload_error"));
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const handleGetAllFileList = () => {
    runGetAllFileList()
      .then((response: any) => {
        const { result } = response;
        setFileList(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGetMyUploadFileList = () => {
    runGetMyUploadList()
      .then((response: any) => {
        const { result } = response;
        setMyUploadList(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleTabChange = (key: string) => {
    switch (key) {
      case "filelist":
        handleGetAllFileList();
        break;
      case "myupload":
        handleGetMyUploadFileList();
        break;
      default:
        break;
    }
  };
  const handleDownloadFile = (type: string | FileType) => {
    setSpinning(true);
    if (type === "filelist") {
      fileList.forEach((file: FileType) => {
        const name = file?.name;
        window.open(`${SERVER_ADDRESS}/${name}`);
      });
      setSpinning(false);
    } else if (type === "myupload") {
      myUploadList.forEach((file: FileType) => {
        const name = file?.name;
        window.open(`${SERVER_ADDRESS}/${name}`);
      });
      setSpinning(false);
    } else if (typeof type === "object") {
      window.open(`${SERVER_ADDRESS}/${type?.name}`);
      setSpinning(false);
    }
  };
  const handleDeleteFile = (data: string | FileType) => {
    if (data === "uploadlist") {
      const deleteParams = myUploadList.map((file: FileType) => {
        return {
          id: file?.id,
          name: file?.name,
        };
      });
      const params = { deleteParams };
      runDeleteAllFile(params)
        .then(() => {
          handleGetMyUploadFileList();
          message.success(formatMessage("message.delete.success"));
        })
        .catch((error) => {
          console.log(error);
          message.error(formatMessage("message.delete.error"));
        });
    } else if (typeof data === "object") {
      const params = { id: data?.id, name: data?.name };
      runDeleteSingleFile(params)
        .then(() => {
          handleGetMyUploadFileList();
          message.success(formatMessage("message.delete.success"));
        })
        .catch((error) => {
          console.log(error);
          message.error(formatMessage("message.delete.error"));
        });
    }
  };
  return (
    <Spin
      spinning={
        loadingMultipleFile ||
        loadingGetAllFileList ||
        loadingGetMyUploadList ||
        loadingDeleteSingleFile ||
        loadingDeleteAllFile ||
        spinning
      }
    >
      <Card
        title={formatMessage("file_admin.title")}
        style={{ height: "calc(100vh - 100px - 2rem)" }}
      >
        <Tabs
          defaultActiveKey="upload"
          onChange={handleTabChange}
          items={[
            {
              label: formatMessage("file_admin.upload_tab"),
              key: "upload",
              children: (
                <>
                  <Upload.Dragger
                    maxCount={5}
                    multiple={true}
                    fileList={uploadFileList}
                    beforeUpload={(_: any, fileList: any) =>
                      handleBeforeUploadFile(fileList)
                    }
                    onRemove={handleRemoveFile}
                    progress={{
                      strokeColor: {
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      },
                      strokeWidth: 3,
                      format: (percent) =>
                        percent && `${parseFloat(percent.toFixed(2))}%`,
                    }}
                    name="files"
                    className="w-1/4"
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      {formatMessage("file_admin.upload_text")}
                    </p>
                  </Upload.Dragger>
                  <Button
                    type="primary"
                    onClick={handleUploadFileList}
                    disabled={uploadFileList.length === 0}
                    loading={uploading}
                    className="mt-4"
                  >
                    {uploading
                      ? formatMessage("file_admin.upload_uploading")
                      : formatMessage("file_admin.upload_upload")}
                  </Button>
                </>
              ),
            },
            {
              label: formatMessage("file_admin.filelist_tab"),
              key: "filelist",
              children: (
                <List
                  size="large"
                  bordered
                  footer={
                    fileList.length === 0 ? (
                      ""
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => handleDownloadFile("filelist")}
                      >
                        {formatMessage(
                          "file_admin.filelist_button_download_all"
                        )}
                      </Button>
                    )
                  }
                  dataSource={fileList}
                  pagination={{ pageSize: 8 }}
                  renderItem={(item: any) => (
                    <List.Item key={item?.id} className="flex justify-between">
                      <span
                        className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer text-green-700"
                        onClick={() => handleDownloadFile(item)}
                      >
                        {item?.originalname}
                      </span>
                      <span className="w-1/4 text-center">
                        {formatGMTTime(item?.time)}
                      </span>
                      <Space>
                        <Button
                          type="default"
                          onClick={() => handleDownloadFile(item)}
                        >
                          {formatMessage("file_admin.filelist_button_download")}
                        </Button>
                      </Space>
                    </List.Item>
                  )}
                />
              ),
            },
            {
              label: formatMessage("file_admin.myupload_tab"),
              key: "myupload",
              children: (
                <List
                  size="large"
                  bordered
                  footer={
                    myUploadList.length === 0 ? (
                      ""
                    ) : (
                      <div>
                        <Button
                          className="mr-2"
                          type="primary"
                          onClick={() => handleDownloadFile("myupload")}
                        >
                          {formatMessage(
                            "file_admin.myupload_button_download_all"
                          )}
                        </Button>
                        <Button
                          type="primary"
                          danger={true}
                          onClick={() => handleDeleteFile("uploadlist")}
                        >
                          {formatMessage(
                            "file_admin.myupload_button_delete_all"
                          )}
                        </Button>
                      </div>
                    )
                  }
                  dataSource={myUploadList}
                  pagination={{ pageSize: 8 }}
                  renderItem={(item: any) => (
                    <List.Item key={item?.id} className="flex justify-between">
                      <span
                        className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer text-green-700"
                        onClick={() => handleDownloadFile(item)}
                      >
                        {item?.originalname}
                      </span>
                      <span className="w-1/4 text-center">
                        {formatGMTTime(item?.time)}
                      </span>
                      <Space>
                        <Button
                          type="default"
                          onClick={() => handleDownloadFile(item)}
                        >
                          {formatMessage(
                            "file_admin.myupload_button_download_file"
                          )}
                        </Button>
                        <Button
                          type="primary"
                          danger={true}
                          onClick={() => handleDeleteFile(item)}
                        >
                          {formatMessage(
                            "file_admin.myupload_button_delete_file"
                          )}
                        </Button>
                      </Space>
                    </List.Item>
                  )}
                />
              ),
            },
          ]}
        />
      </Card>
    </Spin>
  );
};

export default FileAdmin;
