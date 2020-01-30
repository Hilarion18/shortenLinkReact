import React, { Component } from 'react';
import axios from 'axios'
import config from '../../../config'

class LinkTableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      links: this.props.links,
      link: {
        longUrl: '',
      },
    };
  }

  componentDidMount() {
    console.log(`this.props`, this.props)
    this.props.getLinkDatas()
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

  render() {
    return (
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
    )
  }
}

export default LinkTableData