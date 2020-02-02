import Link from 'next/link'
import { NextPage } from 'next'
import Header from '../components/header'
import { useRouter } from 'next/router'
import styled from 'styled-components'

interface IndexProps {
  postsTable: [any]
}

const navItems: { label: string; page: string }[] = [
  { label: 'about', page: '/about' },
  { label: 'blog', page: '/blog' },
  { label: 'contact', page: '/contact' },
]

const StyledNavigation = styled.ul`
  display: flex;
  height: calc(100% - 40px);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const StyledList = styled.li`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    border-bottom: solid 1px;
    :last-child {
      border-bottom: none;
    }
  }
  @media (min-width: 769px) {
    border-left: solid 1px;
    :first-child {
      border-left: none;
    }
  }
`

const Index: NextPage<IndexProps> = () => {
  return (
    <>
      <Header />
      <StyledNavigation>
        {navItems.map(({ label, page }) => (
          <Link href={page}>
            <StyledList key={label}>{label}</StyledList>
          </Link>
        ))}
      </StyledNavigation>
    </>
  )
}

export default Index
