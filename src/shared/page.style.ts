import { css } from '@emotion/react';

const container = css`
  background-color: var(--astra-primary-color-10);
  height: calc(100% - 45px);
  @media (min-width: 1000px) {
    margin-left: 45px;
  }
`;

export default {
  container,
};
