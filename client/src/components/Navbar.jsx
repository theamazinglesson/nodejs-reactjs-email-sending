import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';


class Navbar extends Component {
    render() {
        return (
            <Menu stackable inverted color="blue">
                <Container >
                    <Menu.Item>Home</Menu.Item>
                    <Menu.Item>About</Menu.Item>
                    <Menu.Item>Contact</Menu.Item>
                    <Menu.Item>Service</Menu.Item>
                </Container>
            </Menu>
        );
    }
}


export default Navbar;