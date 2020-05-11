import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { greyscales, white, sub, primary } from '../../Styles/Colors';

function MoreBtn({ className, children, type }) {
  const positionType = type || 'left';
  const node = useRef();
  const [isOpen, setOpen] = useState(false);

  const handleClick = e => {
    if (node.current.contains(e.target)) return;
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <View name="more-view" ref={node} className={className}>
      <Button isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
        <span className="budy-more-horizontal" />
      </Button>
      {isOpen && (
        <Tooltip positionType={positionType}>
          {Array.isArray(children) ? (
            children.map((item, id) => {
              const onClick = item.props.onClick;
              const text = item.props.children;
              return (
                <div
                  className="item"
                  key={id}
                  onClick={e => {
                    setOpen(false);
                    if (onClick) return onClick(e);
                  }}
                >
                  <span className="text">{text}</span>
                </div>
              );
            })
          ) : (
            <div
              className="item"
              onClick={e =>
                setOpen(() => {
                  if (children.props.onClick) {
                    children.props.onClick(e);
                  }
                  return false;
                })
              }
            >
              <span className="text">{children.props.children}</span>
            </div>
          )}
        </Tooltip>
      )}
    </View>
  );
}

const View = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ isOpen }) => (isOpen ? greyscales[100] : white)};
  .budy-more-horizontal {
    font-size: 24px;
    color: ${greyscales[400]};
  }
  :hover {
    background-color: ${greyscales[100]};
  }
  @media (max-width: 530px) {
    width: 28px;
    height: 24px;
    border-radius: 4px;
    .budy-more-horizontal {
      font-size: 20px;
    }
    :hover {
      background-color: ${white};
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  min-width: 200px;
  left: ${({ positionType }) => (positionType === 'left' ? '0px' : 'auto')};
  right: ${({ positionType }) => (positionType === 'right' ? '0px' : 'auto')};
  top: 46px;
  border: solid 1px ${greyscales[200]};
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  background-color: ${white};
  z-index: 10;
  padding: 4px 0px;
  .item {
    cursor: pointer;
    min-height: 32px;
    display: flex;
    align-items: center;
    padding: 0px 16px;
    border-bottom: solid 1px ${greyscales[100]};
    .text {
      font-size: 14px;
      color: ${greyscales[500]};
    }
    :last-child {
      border-bottom: none;
    }
    :hover {
      background-color: ${sub[100]};
      .text {
        color: ${primary[500]};
      }
    }
  }
  @media (max-width: 530px) {
    top: 28px;
  }
`;

export default MoreBtn;
