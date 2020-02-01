import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios'
import config from '../../config.js'
// import LinkTableData from './component/LinkTableData'
import './style/HomeStyle.css'

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      links: [],
      link: {
        longUrl: '',
      },
    };
  }

  componentDidMount() {
    this.getLinkDatas()
  }

  handleChange = (event) => {
    this.setState({ link: {
      longUrl: event.target.value 
    }})
  }
  
  getLinkDatas = async () => {
    axios({
      method: 'GET',
      url: `${config.port}/link`,
      headers: {
      }
    })
      .then((res) => {
        this.setState({
          links: res.data.data
        })
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  handleAddLink = (val) => {
    val.preventDefault();
    this.setState({
      link: {
        longUrl: ''
      }
    });
    axios({
      method: 'POST',
      url: `${config.port}/link`,
      data: this.state.link,
    })
      .then((res) => {
        this.getLinkDatas()
        this.setState({ link: {
          longUrl: ""
        }})
      })
      .catch((err) => {
        // alert(err.message)
        alert(`There is something wrong, please insert the url or use the right url "http://.." not "www" and check your network`)
      })
  }

  removeAllLinks = () => {
      axios({
        method: `DELETE`,
        url: `${config.port}/link`,
      })
        .then((value) => {
          this.getLinkDatas()
        })
        .catch((err) => {
          alert(err.message)
        })
  }

  renderListItem = () => {
    return (
      this.state.links.map((val, index) => 
      <tr key={index}>
        <td className="text-left td">
          <div className="row">
            <input type="hidden" id="get-link" value={val.shortUrl}/>
            <a className="copy-link" href="/#" onClick={this.copyToClipboard}>{val.shortUrl}</a>
            <div className="text-cursor">click to copy this link</div>
          </div>
          {
            (50 < val.longUrl.length)
            ? <a>{ val.longUrl.substring(0,50)+"..." }</a>
            : <a>{val.longUrl}</a>
          }
        </td>
        <td className="visit">will be update soon</td>
        <td className="last-visited">will be update soon</td>
      </tr>
      )
    )
  }

  copyToClipboard() {
    let testingCodeToCopy = document.querySelector('#get-link')
    testingCodeToCopy.setAttribute('type', 'text')
    testingCodeToCopy.select()
    let item = document.getElementById('get-link').value

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      alert(`your url ${item} has been copied ` + msg);
    } catch (err) {
      alert('Oops, unable to copy');
    }

    /* unselect the range */
    testingCodeToCopy.setAttribute('type', 'hidden')
    window.getSelection().removeAllRanges()
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col input-link">
            <form>
              <input
                value={this.state.link.longUrl}
                onChange={this.handleChange} 
                type="urlLink"
                className="form-control"
                aria-describedby="urlLink"
                placeholder="put your link here...."
              />
            </form>
          </div>
          <div className="col col-button">
            <button className="button button--winona button--border-thin button--round-s" data-text="generate link" onClick={this.handleAddLink}><span>generate link</span></button>
          </div>
        </div>
        {/* <LinkTableData/> */}
          <div className="container home-content">
            <div className="row">
              <h5 className="text-left">Previously shortened by you</h5>
              <a href="/#" className="clear-history" onClick={this.removeAllLinks}>Clear history</a>
            </div>
            <table className="item-table">
              <thead>
                <tr className="th-scoped">
                  <th className="first-th" max-length="50">Link</th>
                  <th className="th">Visits</th>
                  <th className="th">Last Visited</th>
                </tr>
              </thead>
              <tbody  >
                {this.renderListItem()}
              </tbody>
            </table>
          </div>
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<HomeComponent />, rootElement);

export default HomeComponent