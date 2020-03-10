import React from 'react'

class NotFoundPage extends React.Component {    
    componentDidMount() {
        this.props.history.push('/404')
    }
    render() {
        return (
            <div>
                <h1>404</h1>
            </div>
        )
    }    
}

export default NotFoundPage
