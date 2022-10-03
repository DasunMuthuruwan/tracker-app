import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

export const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button 
                text={showAdd ? 'Close' : 'Add'} 
                color={showAdd ? 'red' : 'green'} 
                onClick={onAdd} 
            />}
        </header>
    )
}

// add default value for props
Header.defaultProps = {
    title: 'Task Tracker'
}

// add props type
Header.propTypes = {
    title: PropTypes.string.isRequired
}

// add css style
// const headingStyle = {
//     color: "red"
// }

export default Header;