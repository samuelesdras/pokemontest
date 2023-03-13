import Link from 'next/link'
import Image from 'next/image'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import styles from './header.module.scss'

export function Header() {
  return (
    <header className={styles.header__container}>
      <Link href="/">
        <Image src="/logo.svg" alt="logo" priority width={190} height={60} />
      </Link>
      <Navbar expand="sm">
        <Container>
          <Navbar.Toggle aria-controls="headerNavbar" />
          <Navbar.Collapse id="headerNavbar">
            <Nav className={styles.header__links}>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/favorites">Favorites</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
