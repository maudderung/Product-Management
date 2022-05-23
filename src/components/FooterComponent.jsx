import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <footer className='footer'>
                    <nav className="navbar fixed-bottom navbar-light bg-light">
                        <a className="navbar-brand font-weight-light font-italic text-muted">
                            Deyan Dimchev 2022
                        </a>
                    </nav>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;