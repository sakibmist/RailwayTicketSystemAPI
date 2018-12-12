import React from 'react';
import ReactDOM from 'react-dom';
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
        const { routes = [] } = this.props;
        return (
            <div className="card-body border minHeight">
                <div>
                    <h1>React Modal</h1>
                    <Modal show={this.state.show} handleClose={this.hideModal}>
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
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Modal>
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.showModal}>
                        open
                    </button>
                </div>
            </div>
        );
    }
}

RouteListModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    routes: PropTypes.array.isRequired,
    handleModal: PropTypes.func.isRequired
};

const container = document.createElement("div");
document.body.appendChild(container);
ReactDOM.render(<RouteListModal />, container);
export default RouteListModal;

