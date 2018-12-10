import React from "react";
import http from "axios";

class AddRouteTrainPage extends React.Component {
  state = {
    listofStations: [],
    listofTrains: [],
    stationToList: [],
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

  // handleChangeStationFrom = async event => {
  //   const { value } = event.target;
  //   this.setState({ stationFormId: value });
  //   if (!value) return;
  //   const response = await http.get(
  //     `${this.baseUrl}/trains/destinations/${value}`
  //   );
  //   const stationsToList = response.data || [];
  //   this.setState({ stationsToList });
  // }

  handleChangeDeparture = (event, stationToId) => {
    const { stationToList } = this.state;
    const { value } = event.target;
    const index = stationToList.findIndex((item) => item.stationToId === stationToId);
    if (index > -1) {
      stationToList[index].departureTime = value ? value.trim() : null;
      this.setState({ stationToList });
    }
  };

  handleChangeStationTo = (event, stationToId) => {
    const { stationToList } = this.state;
    if (event.target.checked) {
      this.setState({
        stationToList: [...stationToList, { stationToId, departureTime: null }]
      });
    }
     else {
      const index = stationToList.findIndex((item) => item.stationToId === stationToId);
      if (index > -1) stationToList.splice(index, 1);
      this.setState({ stationToList });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    let { trainId, stationFormId, departureTime, stationToList } = this.state;
    stationToList = stationToList.map((item) => ({
      ...item,
      trainId: parseInt(trainId) ,
      stationFormId: parseInt(stationFormId)
    }));
    const data = {
      stationToId: parseInt(stationFormId),
      departureTime,
      trainId:parseInt(trainId),
      stationFormId : parseInt(stationFormId),
    };
    stationToList.push(data);
    const isDataInvalid = stationToList.some((item) => !item.departureTime || !item.stationToId || !item.stationFormId);
    if (isDataInvalid) {
      alert('Depurture time(s) are empty, fill up please!');
      return;
    }     
    const response = await http.post(`${this.baseUrl}/trains/add`,stationToList);
    if(response.status === 200){
      this.setState({ 
        stationToList: [], 
        stationFormId: null, 
        departureTime: '', 
        trainId: '' 
      });
      alert('Added all data successfully');
    } else {
      alert('Something is wrong!');
    }
  }

  render() {
    const {
      listofTrains,
      listofStations,
      departureTime,
      trainId,
      stationFormId,
      stationToList
    } = this.state;

    return (
      <div className="card-body border minHeight">
        <form onSubmit={this.handleSubmit} method="post">
          <div className="card ">
            <div className="card-header">
              <h4>Train Routes and Departure time:</h4>
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
                        onChange={this.handleChange}
                      >
                        <option>--Select--</option>
                        {listofStations.map((station, index) => (
                          <option key={index} value={station.id}>
                            {station.name}
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
              {stationFormId && (<div className="col-sm-6 d-column">
                <div className="col-sm-12 d-flex flex-column">
                  <p className="d-flex">Station To</p>
                  <div className="col-sm-12">
                    <ul className="list-group d-flex flex-column" style={{ maxHeight: 350, overflowY: 'auto' }}>
                      {listofStations.map((station, index) => {
                        if (station.id === parseInt(stationFormId)) return null;
                        const isEnabled = stationToList.some((item) => item.stationToId === station.id);
                        const isInvalid = stationToList.some((item) => item.stationToId === station.id && !item.departureTime);
                        return (
                          <li className="list-group-item" key={index}>
                            <div className="d-flex justify-content-between align-items-center">
                              <span>
                                <input
                                  type="checkbox"
                                  className="mr-2"
                                  onChange={(event) => this.handleChangeStationTo(event, station.id)}
                                />
                                {station.name}
                              </span>
                              <input
                                type="text"
                                placeholder="enter departure time"
                                className={`form-control form-control-sm${isInvalid ? ' is-invalid' : ''}`}
                                style={{ width: '150px' }}
                                name={`${station.id}`}
                                readOnly={!isEnabled}
                                onChange={(event) => this.handleChangeDeparture(event, station.id)}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>)}
            </div>
            <div className="card-footer d-flex justify-content-start">
              <button type="submit" className="btn btn-sm btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default AddRouteTrainPage;
