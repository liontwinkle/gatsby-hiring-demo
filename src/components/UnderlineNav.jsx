import React from 'react'
import styled from 'react-emotion'
import Wrapper from './layout/Wrapper'
import { Text } from 'rebass'
import { Flex } from 'reflexbox'
import { IoIosBook, IoMdStats, IoMdCalendar } from 'react-icons/io'
import Headphones from '../icons/headphones.jsx'
import { TiHeadphones } from 'react-icons/ti'

const Nav = styled.nav`
  border-bottom: 1px solid #e1e4e8;
  margin-bottom: 18px;
  .nav-body {
    margin-bottom: -1px;
  }
  a.menu-item {
    margin-left: 16px;
    padding: 16px 8px;
    margin-right: 16px;
    font-size: 14px;
    line-height: 1.5;
    color: #586069;
    text-align: center;
    border-bottom: 2px solid;
    border-bottom-color: transparent;
    svg {
      margin-right: 5px;
      vertical-align: text-top;
    }
  }
  a.selected {
    font-weight: 600;
    color: #24292e;
    border-bottom-color: ${props => props.theme.colors.black.light};
  }
`

const UnderlineNav = ({ handleClick, selected }) => {
  const selectedBio = selected === 'bio' ? 'selected' : null
  const selectedCharts = selected === 'charts' ? 'selected' : null
  const selectedMixes = selected === 'mixes' ? 'selected' : null
  const selectedEvents = selected === 'events' ? 'selected' : null
  return (
    <Nav>
      <Flex justify="flex-end">
        <Flex className="nav-body">
          <a
            onClick={() => handleClick('bio')}
            className={`menu-item ${selectedBio}`}
          >
            <IoIosBook size={19} />
            Bio
          </a>
          <a
            onClick={() => handleClick('charts')}
            className={`menu-item ${selectedCharts}`}
          >
            <IoMdStats size={19} />
            Charts
          </a>
          <a
            onClick={() => handleClick('mixes')}
            className={`menu-item ${selectedMixes}`}
          >
            <TiHeadphones size={19} />
            Mixes
          </a>
          <a
            onClick={() => handleClick('events')}
            className={`menu-item ${selectedEvents}`}
          >
            <IoMdCalendar size={19} />
            Events
          </a>
        </Flex>
      </Flex>
    </Nav>
  )
}
export default UnderlineNav
