import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "../../components/Icon";
import { TagItem } from "../../api/tags/type";
import { tagList } from "../../api/tags";
import { BillType } from "../../api/bills/type";

const Wrapper = styled.div`
  .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 10px;
    border-bottom: 1px solid #c4c4c4;
    margin-left: 20px;
    margin-right: 20px;
    .icon-name {
      display: flex;
      align-items: center;
      flex: 1;
      min-height: 48px;
      .icon-container {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #e0e0e0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
        .icon {
          width: 24px;
          height: 24px;
        }
      }
    }
    > .icon {
      width: 16px;
      height: 16px;
    }
  }
`;
type Props = {
  type: BillType;
};
const DisplayTags: React.FC<Props> = (props) => {
  const [tags, setTags] = useState<TagItem[]>([]);
  const fetchTagList = async () => {
    try {
      const { data } = await tagList();
      setTags(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchTagList();
  }, []);
  return (
    <Wrapper className="display">
      {tags
        .filter((i) => i.type === props.type)
        .map((i) => (
          <Link
            to={
              "/tags/" +
              i.id +
              `?type=${props.type}&tagName=${i.name}&icon=${i.icon}`
            }
            key={i.id}
            className="link"
          >
            <div className="icon-name">
              <div className="icon-container">
                <Icon name={i.icon} />
              </div>
              <span>{i.name}</span>
            </div>
            <Icon name="right" />
          </Link>
        ))}
    </Wrapper>
  );
};
export { DisplayTags };
