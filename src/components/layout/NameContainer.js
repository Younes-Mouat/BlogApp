import React, { Component } from 'react'
import Name from './Name'


class NameContainer extends Component {
    render() {
        return(
            <div>
                {this.props.users.map(name => <Name name = {name} />)}
            </div>
        )
    }
}

export default NameContainer