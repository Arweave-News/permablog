import React from 'react'
import { Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import WalletLoader from './wallet_loader'


export default function Header() {
    return(
        <div class="topBar">

            <Navbar className="">
            <NavLink className="btn navbar-item text-decoration-none mr-4" to="/"><Navbar.Brand>permablog</Navbar.Brand></NavLink>
            <Navbar.Toggle />
           {/* <NavLink className="btn navbar-item nav-btn" activeClassName="is-active" to="/posts">Posts</NavLink>
            <NavLink className="btn navbar-item nav-btn" activeClassName="is-active" to="/new">New</NavLink>
            <NavLink className="btn navbar-item nav-btn" activeClassName="is-active" to="/ama">AMA</NavLink>
            */}
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <WalletLoader/>
                </Navbar.Text>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}