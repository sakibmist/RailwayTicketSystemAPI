import React from "react";
import http from "axios";

class AddRouteTrainPage extends React.Component {
  state = {
    listofStations: [],
    listofTrains: [],
    stationsToList:[],
    departureTime: "",
    trainId: "",
    stationFormId: ""
  };

  baseUrl = "http://localhost:5000/api";

  async componentDidMount() {
    let response = await http.get(`${this.baseUrl}/trains`);
    if (response.status === 200) {
      const listofTrains = response.data;
      this.setState({ listofTrains });
    }
    response = await http.get(`${this.baseUrl}/stations`);
    if (response.status === 200) {
      const listofStations = response.data; 

      this.setState({ listofStations });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleChangeStationFrom= async event =>{
      const {value} = event.target;
        this.setState({stationFormId:value});
        if (!value) return;
        const response = await http.get(
          `${this.baseUrl}/trains/destinations/${value}`
        );
        
    
        const stationsToList = response.data || [];
    
        this.setState({ stationsToList });

  }

  render() {
    const {
      listofTrains,
      listofStations,
      stationsToList,
      departureTime,
      trainId,
      stationFormId
    } = this.state;
    return (
      <div className="card-body border minHeight">
        <div className="card ">
          <div className="card-header">
            <h3>Train Routes and Departure time:</h3>
          </div>
          <div className="card-body d-flex minHeight">
            <div className="col-sm-6 d-column">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="trainId" className="control-label col-sm-4">
                    Trains
                  </label>
                  <div className="col-sm-8">
                    <select
                      name="trainId"
                      id="trainId"
                      value={trainId}
                      className="form-control"
                      onChange={this.handleChange}
                    >
                      <option>--Select--</option>
                      {listofTrains.map((train, index) => (
                        <option key={index} value={train.id}>
                          {train.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="stationFormId"
                    className="control-label col-sm-4"
                  >
                    Station From
                  </label>
                  <div className="col-sm-8">
                    <select
                      name="stationFormId"
                      id="stationFormId"
                      value={stationFormId}
                      className="form-control"
                      onChange={this.handleChangeStationFrom}
                    >
                      <option>--Select--</option>
                      {listofStations.map((train, index) => (
                        <option key={index} value={train.id}>
                          {train.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="departureTime"
                    className="control-label col-sm-4"
                  >
                    Departure Time
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="departureTime"
                      name="departureTime"
                      className="form-control"
                      onChange={this.handleChange}
                      value={departureTime}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 d-column">
              <div className="col-sm-12 d-flex flex-column">
                <p className="d-flex">Station To</p>
                <div className="col-sm-12">
                  <ul className="list-group d-flex flex-column" style={{maxHeight: 350, overflowY: 'auto' }}>
                    {stationsToList.map((item, index) => (
                        <li className="list-group-item" key={index}>
                            <div className="d-flex justify-content-between align-items-center">
                                <span><input type="checkbox" className="mr-2" value={item.value}/> {item.text}</span>
                                <input type="text" placeholder="enter departure time" className="form-control form-control-sm" style={{ width: '150px' }}/>
                            </div>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddRouteTrainPage;
