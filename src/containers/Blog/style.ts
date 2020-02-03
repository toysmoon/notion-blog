import styled from 'styled-components'

export const StyledListWrapper = styled.div`
  overflow: scroll;
  flex: 1;
`

export const StyledContent = styled.div`
  overflow: scroll;
  flex: 2;
  border-left: solid 1px;
  border-right: solid 1px white;
  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
  }
`

export const StyledWrapper = styled.div`
  display: flex;
  height: calc(100% - 3rem);
`
