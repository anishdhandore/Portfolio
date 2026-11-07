// CSS device frames for case study screens. Each takes a screenshot `src`
// and an accessible `alt`; sizes come from the parent via width.
import React from 'react';
import styled from 'styled-components';

export const BrowserFrame = ({ src, alt, label, className }) => (
  <Browser className={className}>
    <BrowserBar aria-hidden="true">
      <span className="dots">
        <i />
        <i />
        <i />
      </span>
      <span className="url">{label}</span>
    </BrowserBar>
    <img src={src} alt={alt} width={1400} height={875} loading="lazy" decoding="async" />
  </Browser>
);

export const TabletFrame = ({ src, alt, className }) => (
  <Tablet className={className}>
    <img src={src} alt={alt} width={1400} height={875} loading="lazy" decoding="async" />
  </Tablet>
);

export const PhoneFrame = ({ src, alt, className }) => (
  <Phone className={className}>
    <img src={src} alt={alt} width={780} height={1688} loading="lazy" decoding="async" />
    <Island aria-hidden="true" />
  </Phone>
);

const screenImg = `
  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const Browser = styled.figure`
  overflow: hidden;
  border-radius: 14px;
  background: #1b1c1f;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 40px 80px -30px rgba(0, 0, 0, 0.6);
  ${screenImg}
`;

const BrowserBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 34px;
  padding: 0 14px;
  background: #202125;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  .dots {
    display: flex;
    gap: 6px;
  }

  .dots i {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.22);
  }

  .url {
    flex: 1;
    max-width: 360px;
    margin: 0 auto;
    padding: 4px 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Tablet = styled.figure`
  padding: 2.2%;
  border-radius: 6% / 9%;
  background: linear-gradient(145deg, #2e2e34, #0d0d10 40%, #060607);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 40px 80px -30px rgba(0, 0, 0, 0.65);

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 3.5% / 5.5%;
  }
`;

const Phone = styled.figure`
  position: relative;
  padding: 3.5%;
  border-radius: 16% / 7.5%;
  background: linear-gradient(145deg, #2f2f35, #0c0c0f 45%, #060607);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 40px 70px -26px rgba(0, 0, 0, 0.7);

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 12.5% / 5.8%;
  }
`;

const Island = styled.span`
  position: absolute;
  top: 5.2%;
  left: 50%;
  width: 30%;
  height: 3.4%;
  border-radius: 999px;
  background: #050506;
  transform: translateX(-50%);
`;
