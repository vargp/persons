import React, {Component} from 'react';
import './Table.css';
import persons from './persons.json';

const Row = ({name, job, age, nick, employee, remove}) => (
  
  <div className="row" >
    <div>{name}<br/>{job}</div>
    <div>{age}</div>
    <div>{nick}</div>
    <div> {
    employee ? (
        <input type="checkbox" defaultChecked/>
      ) : (
        <input type="checkbox" />
      )}
        </div>    
        <div><input type="button" value="Delete" className="button" onClick={() => remove(name, job)}/></div>    
  </div>
);



class Table extends Component {
    
  
  
  constructor(props) {
    
    super(props);
    this.state = {
      data: persons,
      showModal: false  
    };
    this.newName = React.createRef();
    this.newJob = React.createRef();
    this.newAge = React.createRef();
    this.newNick = React.createRef();
    this.newEmployee = false;
  }
  
  openAdd() {
      this.setState({showModal: true});
      this.newEmployee = false;
  }
  
  closeAdd() {
      this.setState({showModal: false});
      
  }
  
  toggleEmployee() {
      this.newEmployee = !this.newEmployee;
      
  }
  
  remove = (name, job) => {
    
    const arrayCopy = this.state.data.filter(row => !(row.name === name && row.job === job));
    this.setState({data: arrayCopy});
  };
  
  addRow = () => {
    var newData = {};
    newData.name = this.newName.current.value;
    newData.job = this.newJob.current.value;
    newData.age = this.newAge.current.value;
    newData.nick = this.newNick.current.value;
    newData.employee = this.newEmployee;
    const arrayCopy = this.state.data.concat(newData);
    this.setState({data: arrayCopy});
    this.setState({showModal: false});
  };
    
  render() {
    
    const rows = this.state.data.map( (rowData) => <Row remove={this.remove} {...rowData} />);
    

    return (
      <div className="table">
        
            
        {this.state.showModal &&  (
            
            <div className="modal">
                <div className="modalLine">Name <input className="textInput" type="text" ref={this.newName} size="30" /></div>
                <div className="modalLine">Job Title <input className="textInput" type="text" ref={this.newJob} size="30" /></div>
                <div className="modalLine">Age <input className="textInput" type="text" ref={this.newAge} size="30" /></div>
                <div className="modalLine">Nickname <input className="textInput" type="text" ref={this.newNick} size="30" /></div>
                <div className="modalLine">Employee <input type="checkbox" onChange={() => this.toggleEmployee()} /></div>
                <br/>
                <div className="modalButtons">
                    <input type="button" value="Ok" onClick={() => this.addRow()} />
                    <input type="button" value="Cancel" onClick={() => this.closeAdd()}/>
                </div>
            </div>
            
          )}
          
        <div><input type="button" value="Add" className="button" onClick={() => this.openAdd()}/></div><br/>  
        <div className="header">
          <div>Name<br/>(job title)</div>
          <div>Age</div>
          <div>Nickname</div>
          <div>Employee</div>
          <div>  </div>
        </div>
        <div className="body">
          {rows}
        </div><br/><b>Data Dump</b>
        <textarea className="dump" rows="15" value={JSON.stringify(this.state.data)}></textarea>
      </div>
      
      
    );
    
  }
}


export default Table;
