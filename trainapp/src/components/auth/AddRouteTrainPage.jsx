import React from "react";

class AddRouteTrainPage extends React.Component {
    render() {
        return (
            <div className="card-body border minHeight d-flex">
                <div className="col-sm-6 d-column">
                    <div className="col-sm-12">
                        <div className="form-group row">
                            <label htmlFor="trainName" className="control-label col-sm-4">Trains</label>
                            <div className="col-sm-8">
                                <select name="trainName" id="trainName" className="form-control" >
                                    <option>--Select--</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="stationForm" className="control-label col-sm-4">Station From</label>
                            <div className="col-sm-8">
                                <select name="stationForm" id="stationForm" className="form-control" >
                                    <option>--Select--</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 d-column">
                    <div className="col-sm-12 d-flex">
                        <caption className="d-flex">Station To</caption>
                        <div className="col-sm-12">
                            <ul>
                                <li>Dhaka</li>
                                <li>Dhaka</li>
                                <li>Dhaka</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddRouteTrainPage;