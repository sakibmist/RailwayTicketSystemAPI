import React from 'react';
import PropTypes from 'prop-types';


const Modal = ({ handleClose, show, children, headerText = 'Modal Heading'}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    
    return (
        
        <div className={showHideClassName}>
            <div className="modal-main">
                <div className="modal-content">
                    <div className="modal-header"> 
                        <h5 className="modal-title">{headerText}</h5>  
                        <button type="button" data-dismiss="modal" className="close" aria-label="Close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary">Save changes</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};
// props hisabe functional components e ja ja takbe ta define kore dite hobe.
Modal.propTypes = {
    headerText: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    children: PropTypes.node,
};

export default Modal;


