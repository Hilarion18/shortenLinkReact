import React, { Component } from 'react';
// import logo from '../../logo.svg';
import axios from 'axios'
import config from '../../config.js'
import LinkTableData from './component/LinkTableData'
// import styles from './style/HomeComponentStyle.css.js'

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
      .then((value) => {
        this.setState({
          links: value.data.data
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
      // headers: {
      //   token: localStorage.getItem("token")
      // },
    })
      .then((res) => {
        this.getLinkDatas()
        // this.setState({
        //   link: {
        //     longUrl: ''
        //   }
        // })
      })
      .catch((err) => {
        console.log(`err`, err.message)
        // alert(err.message)
        alert('there is something wrong, please try again later')
      })
  }

  removeAllLinks = () => {
    // if (this.isLogin) {
      axios({
        method: `DELETE`,
        url: `${config.port}/link`,
        headers: {
          // id: localStorage.get('userId'),
          // token: localStorage.getItem('token')
        }
      })
        .then((value) => {
          // this.links = []
        })
        .catch((err) => {
          alert(err.message)
        })
    // } else {
    //   this.state.links = []
    // }
  }

  renderListItem = () => {
    return (
      // <div>
        // {
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
                ? <a>{val.longUrl}</a>
                : <a>{ val.longUrl.substring(0,50)+"..." }</a>
              }
            </td>
            <td className="visit">will be update soon</td>
            <td className="last-visited">will be update soon</td>
          </tr>
          )
        // }
      // </div>
    )
  }

  copyToClipboard() {
    let testingCodeToCopy = document.querySelector('#get-link')
    testingCodeToCopy.setAttribute('type', 'text')    // 不是 hidden 才能複製
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
        <div className="scope-input row">
          <div className="col input-link">
            <input
              onChange={this.handleChange} 
              type="urlLink"
              className="form-control"
              aria-describedby="urlLink"
              placeholder="put your link here...."
            />
          </div>
          <div className="col col-button">
            <button className="button button--winona button--border-thin button--round-s" data-text="generate link" onClick={this.handleAddLink}><span>generate link</span></button>
          </div>
        </div>
        {/* <header className="App-header"> */}
          <div className="container home-content">
            <div className="row">
              <h5 className="text-left">Previously shortened by you</h5>
              <a href="/#" className="clear-history" onClick={this.removeAllLinks}>Clear history</a>
            </div>
            <table className="item-table">
              <thead>
                <th className="first-th" max-length="50">Link</th>
                <th className="th">Visits</th>
                <th className="th">Last Visited</th>
              </thead>
              <tbody  >
                {this.renderListItem()}
              </tbody>
            </table>
          </div>
        {/* </header> */}
      </div>
    );
  }
}

export default HomeComponent