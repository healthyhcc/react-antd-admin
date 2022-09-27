import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { Tag, Tooltip, Space, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { closeTag, closeOtherTag, closeAllTag } from "@/store/store";

const Tags: React.FC = () => {
  const state: any = useSelector(state => state);
  const tagsDispatch = useDispatch();
  const { tags } = state;
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const onClickTag = (item: any) => {
    navigate(item?.key);
  };
  const onCloseTag = (item: any) => {
    const tagLength = tags.length;
    if (pathname === item.key && item.key === tags[tagLength - 1].key) {
      navigate(tags[tagLength - 2].key);
    }
    if (pathname === item.key && item.key !== tags[tagLength - 1].key) {
      const tagIndex = tags.findIndex(
        (tagItem: any) => tagItem.key === item.key
      );
      navigate(tags[tagIndex + 1].key);
    }
    closeTag(item);
  };
  const onCloseOtherTag = (item: any) => {
    closeOtherTag(item);
  };
  const onCloseAllTag = () => {
    const tagAction = closeAllTag();
    tagsDispatch(tagAction);
  };
  return (
    <div className="w-full pl-4 py-2" style={{ backgroundColor: "#fafafa" }}>
      {tags.map((item: any) => (
        <Tag
          key={item?.key}
          closable={item?.key !== "/home"}
          color={item?.key === pathname ? "#1890ff" : ""}
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
