import React, { Fragment } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

interface PropsType {
  uploading: boolean;
}
const Uploading: React.FC<PropsType> = (props: any) => {
  const { uploading } = props;
  return (
    <Fragment>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>Upload</div>
    </Fragment>
  );
};

export default Uploading;
