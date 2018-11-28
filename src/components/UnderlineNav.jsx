import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
// import { Box } from 'rebass'
import { IoIosBook, IoMdStats, IoMdCalendar } from 'react-icons/io'
import { TiHeadphones } from 'react-icons/ti'
// import { Link } from 'gatsby'

const Nav = styled.nav`
  border-bottom: 1px solid #e1e4e8;
  margin-bottom: 18px;
  .nav-body {
    margin-bottom: -1px;
  }
  div.menu-item {
    margin-left: 16px;
    padding: 16px 8px;
    margin-right: 16px;
    font-size: 14px;
    line-height: 1.5;
    color: #586069;
    text-align: center;
    border-bottom: 2px solid;
    border-bottom-color: transparent;
    cursor: pointer;
    svg {
      margin-right: 5px;
      vertical-align: text-top;
    }
  }
  div.selected {
    font-weight: 600;
    color: #24292e;
    border-bottom-color: ${props => props.theme.colors.black.light};
  }
`

const UnderlineNav = ({ handleClick, selected }) => {
  const selectedBio = selected === '#bio' ? 'selected' : null
  const selectedCharts = selected === '#charts' ? 'selected' : null
  const selectedMixes = selected === '#mixes' ? 'selected' : null
  const selectedEvents = selected === '#events' ? 'selected' : null
  return (
    <Nav>
      <Flex justifyContent="flex-start" className="nav-body" flexWrap="wrap">
        <div
          onClick={e => handleClick(e, '#bio')}
          className={`menu-item ${selectedBio}`}
          // href="#bio"
        >
          <IoIosBook size={19} />
          Bio
        </div>
        <div
          onClick={e => handleClick(e, '#charts')}
          className={`menu-item ${selectedCharts}`}
          // href="#charts"
        >
          <IoMdStats size={19} />
          Charts
        </div>
        <div
          onClick={e => handleClick(e, '#mixes')}
          className={`menu-item ${selectedMixes}`}
        >
          <TiHeadphones size={19} />
          Mixes
        </div>
        <div
          onClick={e => handleClick(e, '#events')}
          className={`menu-item ${selectedEvents}`}
        >
          <IoMdCalendar size={19} />
          Events
        </div>
      </Flex>
    </Nav>
  )
}
export default UnderlineNav
