import React from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';

class RouteListModal extends React.Component {
    state = {
        show: this.props.isOpen
    };

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
        this.props.handleModal();
    };

    render() {
        const { routes = [], trainName, trainCode } = this.props;
        return (
            <div className="card-body border minHeight">
                <div>

                    <Modal show={this.state.show} handleClose={this.hideModal} headerText={`${trainCode}-${trainName}`}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>SL#</th> 
                                    <th>Station Name</th>
                                    <th>Departure Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {routes.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td> 
                                        <td>{item.stationName}</td>
                                        <td>{item.departureTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Modal>

                </div>
            </div>
        );
    }
}

RouteListModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    routes: PropTypes.array.isRequired,
    trainName: PropTypes.string.isRequired,
    trainCode: PropTypes.string.isRequired,
    handleModal: PropTypes.func.isRequired
};
export default RouteListModal;

