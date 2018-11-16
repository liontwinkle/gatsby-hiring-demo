import React from 'react'
import styled, { css } from 'react-emotion'
import {
  FaFacebook,
  FaTwitter,
  FaMixcloud,
  FaSoundcloud,
  FaInstagram,
} from 'react-icons/fa'
import theme from '../../config/theme'

const WithComponent = (WrappedComponent, data) => (
  <WrappedComponent data={data} />
)

const renderSwitch = type => {
  switch (type) {
    case 'fb':
      return FaFacebook
    case 'tw':
      return FaTwitter
    case 'mc':
      return FaMixcloud
    case 'sc':
      return FaSoundcloud
    case 'in':
      return FaInstagram
  }
}

const Link = css({
  color: theme.colors.black.light,
})

const SocialLink = ({ type, link, size }) => {
  const Component = renderSwitch(type)
  return (
    <a className={Link} href={link} target="blank">
      <Component size={size} />
    </a>
  )
}

export default SocialLink
