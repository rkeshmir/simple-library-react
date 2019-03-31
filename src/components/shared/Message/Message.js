// IMPORT PACKAGE REFERENCES

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {removeMessage} from '../../state/actions/MessageActions';
import {ERROR, SUCCESS, WARNING, INFO} from '../Constants';


// COMPONENT

class Message extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return <React.Fragment>{this.props.messages.length > 0 && <div aria-live="polite" aria-atomic="true" className="message-container">
            {
                this.props.messages.map(message=><div key={message.id} className="toast show mb-2">
                    <div className="toast-header">
                        {message.status === ERROR && <i className="fa fa-exclamation-circle mr-2"/>}
                        {message.status === WARNING && <i className="fa fa-exclamation-triangle mr-2"/>}
                        {message.status === SUCCESS && <i className="fa fa-check-circle mr-2"/>}
                        {message.status === INFO && <i  className="fa fa-info-circle mr-2"/>}
                        <strong className="mr-auto">{message.status}</strong>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span onClick={()=>this.props.removeMessage(message.id)} aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        {message.content}
                    </div>
                </div>)
            }
        </div>}</React.Fragment>;
    }
}



Message.propTypes = {
    messages: PropTypes.array,
    removeMessage: PropTypes.func
};

const mapStateToProps = state=>{
    return {
        messages: state.message.messages
    };
};
const mapDispatchToProps = dispatch=> {
    return {
        removeMessage: id=>dispatch(removeMessage(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Message);
