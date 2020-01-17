import axios from 'axios'
import Link from 'next/link'
import { NextPage } from 'next'
import Header from '../components/header'
import { useRouter } from 'next/router'

interface IndexProps {
  postsTable: [any]
}

const navItems: { label: string; page: string }[] = [
  { label: 'resume', page: '/resume' },
  { label: 'blog', page: '/blog' },
  { label: 'contact', page: '/contact' },
]

const Index: NextPage<IndexProps> = () => {
  const { pathname } = useRouter()
  return (
    <>
      <Header />
      <ul>
        {navItems.map(({ label, page }) => (
          <li key={label}>
            <Link href={page}>
              <a className={pathname === page ? 'active' : undefined}>
                {label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Index
