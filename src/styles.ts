import styled from 'styled-components';
import { ReactComponent as Logo } from './logo.svg';

export const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
`;

export const Eye = styled(Logo)`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 2rem;
  width: 2rem;
`;

export const Button = styled.button`
  position: absolute;
  right: 1rem;
`;
