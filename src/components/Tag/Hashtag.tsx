import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';

interface EditableTagGroupProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}
const TagPlus = styled(Tag)`
  background: #fff;
  border-style: dashed;
`;

const TagInput = styled(Input)`
  width: 78px;
  margin-right: 8px;
  vertical-align: top;
`;

const EditTag = styled(Tag)`
  user-select: none;
`;

export const EditableTagGroup = ({ tags, setTags }: EditableTagGroupProps) => {
  // const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [editInputIndex, setEditInputIndex] = useState<any>(-1);
  const [editInputValue, setEditInputValue] = useState<string>('');
  const saveInputRef = useRef(null);
  const saveEditInputRef = useRef(null);

  const handleClose = (removedTag: any) => {
    const currentTags = tags.filter((tag) => tag !== removedTag);
    setTags(currentTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: any) => {
    console.log('32');
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = tags;
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputValue('');
    setEditInputIndex(-1);
  };

  return (
    <div>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <TagInput
              ref={saveEditInputRef}
              key={tag}
              size="small"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <EditTag key={tag} closable onClose={() => handleClose(tag)}>
            <span
              onDoubleClick={(e) => {
                setEditInputIndex(index);
                setEditInputValue(tag);
                e.preventDefault();
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </EditTag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <TagInput
          ref={saveInputRef}
          type="text"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <TagPlus onClick={showInput}>
          <PlusOutlined /> New Tag
        </TagPlus>
      )}
    </div>
  );
};
