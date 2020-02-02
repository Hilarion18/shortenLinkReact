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
      isTyping: false,
    };
  }

  componentDidMount() {
    this.getLinkDatas()
  }

  handleChange = (event) => {
    this.setState({
      link: {
        longUrl: event.target.value 
      },
      isTyping: true
    })
    if (event.target.value === '') {
      this.setState({
        isTyping: false
      })
    }
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
        this.setState({
          link: {
            longUrl: ""
          },
          isTyping: false
        })
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

  copyToClipboard(val) {
    const item = document.createElement('textarea')
    item.value = val
    item.setAttribute('type', 'text')
    document.body.appendChild(item)
    item.select()
    document.execCommand('copy');
    document.body.removeChild(item);

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      alert(`your url ${val} has been copied ` + msg);
    } catch (err) {
      alert('Oops, unable to copy');
    }

    /* unselect the range */
    window.getSelection().removeAllRanges()
  }

  renderListItem = () => {
    return (
      this.state.links.map((val, index) => 
      <tr key={index}>
        <td className="text-left td">
          <div className="row">
            <input type="hidden" id="get-link" value={val.shortUrl}/>
            <div onClick={() => this.copyToClipboard(val.shortUrl)}>
              <a className="short-link" href="/#" >bit.ly/</a>
              <a className="copy-link" href="/#" >{val.hashed}</a>
            </div>
            <div className="text-cursor">click to copy this link</div>
          </div>
          {
            (50 < val.longUrl.length)
            ? <div className="td-content">{ val.longUrl.substring(0,50)+"..." }</div>
            : <div className="td-content">{val.longUrl}</div>
          }
        </td>
        <td className="visit">will be update soon</td>
        <td className="last-visited">will be update soon</td>
      </tr>
      )
    )
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col input-link">
            <form>
              <input
                value={this.state.link.longUrl}
                onChange={this.handleChange} 
                type="urlLink"
                className="form-control"
                aria-describedby="urlLink"
                placeholder="Paste the link you want to shorten here"
              />
            </form>
          </div>
          { 
            this.state.isTyping
            ? <div className="col">
                <button className="button2 button--winona button--border-thin button--round-s" data-text="Shorten this link" onClick={this.handleAddLink}><span>Shorten this link</span></button>
              </div>
            : <div className="col">
                <button className="button button--winona button--border-thin button--round-s" data-text="Shorten this link" onClick={this.handleAddLink}><span>Shorten this link</span></button>
              </div>
          }
        </div>
        <div className="home-content">
          <div className="d-flex justify-content">
            <div className="">
              Previously shortened by you
            </div>
            <div className="clear-history">
              <a href="/#" className="clear-history" onClick={this.removeAllLinks}>Clear history</a>
            </div>
          </div>
          <table className="item-table">
            <thead>
              <tr className="th-scoped">
                <th className="first-th" max-length="50">LINK</th>
                <th className="th">VISITS</th>
                <th className="th">LAST VISITED</th>
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

export default HomeComponent
