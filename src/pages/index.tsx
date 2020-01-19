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
  height: calc(100vh - 40px);
  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  li + li {
    border-left: solid 1px;
  }
`

const Index: NextPage<IndexProps> = () => {
  return (
    <>
      <Header />
      <StyledNavigation>
        {navItems.map(({ label, page }) => (
          <Link href={page}>
            <li key={label}>{label}</li>
          </Link>
        ))}
      </StyledNavigation>
    </>
  )
}

export default Index
