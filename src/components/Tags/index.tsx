import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { Tag, Tooltip, Space, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { closeTag, closeOtherTag, closeAllTag } from "@/store";

interface TagType {
  key: string;
  label: string;
}
const Tags: React.FC = () => {
  const state: any = useSelector((state) => state);
  const { settings } = state;
  const tagsDispatch = useDispatch();
  const { tags } = state?.tags;
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const onClickTag = (item: TagType) => {
    navigate(item?.key);
  };
  const onCloseTag = (item: TagType) => {
    const tagLength = tags.length;
    if (pathname === item.key && item.key === tags[tagLength - 1].key) {
      navigate(tags[tagLength - 2]?.key);
    }
    if (pathname === item.key && item.key !== tags[tagLength - 1].key) {
      const tagIndex = tags.findIndex(
        (tagItem: TagType) => tagItem.key === item.key
      );
      navigate(tags[tagIndex + 1]?.key);
    }
    const closeTagAction = closeTag(item);
    tagsDispatch(closeTagAction);
  };
  const onCloseOtherTag = (item: TagType) => {
    const closeOtherTagAction = closeOtherTag(item);
    tagsDispatch(closeOtherTagAction);
  };
  const onCloseAllTag = () => {
    const closeAllTagAction = closeAllTag(null);
    tagsDispatch(closeAllTagAction);
    navigate(tags[0]?.key);
  };
  return (
    <div className="w-full pl-4 py-2" style={{ backgroundColor: "#fafafa" }}>
      {tags.map((item: TagType) => (
        <Tag
          key={item?.key}
          closable={item?.key !== "/home"}
          color={item?.key === pathname ? settings?.themeColor : ""}
          closeIcon={<CloseOutlined className="align-baseline" />}
          onClose={() => onCloseTag(item)}
          className="text-sm mb-2"
        >
          <Tooltip
            placement="bottom"
            title={
              <Space>
                <Button onClick={() => onCloseOtherTag(item)}>
                  {formatMessage("tags.delete_other")}
                </Button>
                <Button onClick={onCloseAllTag}>
                  {formatMessage("tags.delete_all")}
                </Button>
              </Space>
            }
          >
            <span onClick={() => onClickTag(item)} className="cursor-pointer">
              {formatMessage(item?.label)}
            </span>
          </Tooltip>
        </Tag>
      ))}
    </div>
  );
};

export default Tags;
