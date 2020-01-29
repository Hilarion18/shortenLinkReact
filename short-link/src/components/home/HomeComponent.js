import React, { Component } from 'react';
// import logo from '../../logo.svg';
import axios from 'axios'
import config from '../../config.js'
// import styles from './style/HomeComponentStyle.css.js'

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      links: []
    };
  }

  componentDidMount() {
    this.getLinkDatas()
  }

  getLinkDatas = async () => {
    axios({
      method: 'GET',
      url: `${config.port}/link`,
      headers: {
      }
    })
      .then((value) => {
        this.links = value.data.data
        console.log(`this.links`, this.links)
      })
      .catch((err) => {
        alert(err.message)
      })
  }



  handleSubmit = () => {

  }

  removeAllLinks = () => {

  }

  renderListItem = () => {
    return (
      <ul>
        {
          this.state.links.map((val, index) => 
            // return (
              <li key={index}>
                { val.shortUrl }
              </li>
            // );
          )
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="scope-input row">
          <div className="col input-link">
            <input
              v-model="link.longUrl"
              type="urlLink"
              className="form-control"
              aria-describedby="urlLink"
              placeholder="put your link here...."
            />
          </div>
          <div className="col col-button">
            <button className="button button--winona button--border-thin button--round-s" data-text="generate link" onClick={this.handleSubmit}><span>generate link</span></button>
          </div>
        </div>
        {/* <header className="App-header"> */}
          <div className="container home-content">
            <div className="row">
              <h5 className="text-left">Previously shortened by you</h5>
              <a href="" className="clear-history" onClick={this.removeAllLinks}>Clear history</a>
            </div>
            <table className="item-table">
              <thead>
                <th className="first-th" max-length="50">Link</th>
                <th className="th">Visits</th>
                <th className="th">Last Visited</th>
              </thead>
              <tbody  >
                {this.renderListItem()}
                {/* { (this.state.links && 0 < this.state.links.length)
                  ? this.state.links.map((item, index) => {
                    return (
                      <h1>{item.shortUrl}</h1>
                    )}
                  )
                  : null
                } */}
                {/* <tr :key="index" v-for="(link , index) in links">
                  <td className="text-left td">
                    <div className="row">
                      <input type="hidden" id="get-link" :value="link.shortUrl">
                      <a className="copy-link" href="" @click.stop.prevent="copyToClipboard">{{link.shortUrl}}</a>
                      <div className="text-cursor">click to copy this link</div>
                    </div>
                    <a className="long-url" v-if="link.longUrl.length<50">{{link.longUrl}}</a>
                    <a v-else>{{ link.longUrl.substring(0,50)+"..." }}</a>
                  </td>
                  <td className="visit">will be update soon</td>
                  <td className="last-visited">will be update soon</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        {/* </header> */}
      </div>
    );
  }
}

export default HomeComponent