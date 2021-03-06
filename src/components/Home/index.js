import {Component} from 'react'

import {Link} from 'react-router-dom'

import {BsSearch} from 'react-icons/bs'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import {BiChevronRightSquare} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Footer from '../Footer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstant = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    searchInput: '',
    searchList: [],
    countriesData: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const updatedData = statesList.map(item => {
        if (data[item.state_code]) {
          return {
            confirmed: data[`${item.state_code}`].total.confirmed,
            recovered: data[`${item.state_code}`].total.recovered,
            deceased: data[`${item.state_code}`].total.deceased,
            population: data[`${item.state_code}`].meta.population,
            active:
              data[`${item.state_code}`].total.confirmed -
              (data[`${item.state_code}`].total.recovered +
                data[`${item.state_code}`].total.deceased),
            id: item.state_code,
            name: item.state_name,
          }
        }
        return {
          confirmed: 0,
          recovered: 0,
          deceased: 0,
          population: 0,
          active: 0,
          id: item.state_code,
          name: item.state_name,
        }
      })
      this.setState({
        countriesData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    }
  }

  ascending = () => {
    const {countriesData} = this.state
    const ascendingData = countriesData.sort((a, b) => {
      const firstElement = a.name.toLowerCase()
      const secondElement = b.name.toLowerCase()
      if (firstElement > secondElement) {
        return 1
      }
      if (firstElement < secondElement) {
        return -1
      }
      return 0
    })
    this.setState({countriesData: ascendingData})
  }

  descending = () => {
    const {countriesData} = this.state
    const descendingData = countriesData.sort((a, b) => {
      const firstElement = a.name.toLowerCase()
      const secondElement = b.name.toLowerCase()
      if (firstElement > secondElement) {
        return -1
      }
      if (firstElement < secondElement) {
        return 1
      }
      return 0
    })
    this.setState({countriesData: descendingData})
  }

  searchInputChange = input => {
    const newSearchList = statesList.filter(item =>
      item.state_name.toLowerCase().includes(input.target.value),
    )
    this.setState({searchInput: input.target.value, searchList: newSearchList})
  }

  successView = () => {
    const {countriesData, searchList, searchInput} = this.state
    const confirmed = countriesData.map(item => item.confirmed)
    const recovered = countriesData.map(item => item.recovered)
    const active = countriesData.map(item => item.active)
    const deceased = countriesData.map(item => item.deceased)

    const totalConfirmed = confirmed.reduce((a, b) => a + b, 0)
    const totalRecovered = recovered.reduce((a, b) => a + b, 0)
    const totalActive = active.reduce((a, b) => a + b, 0)
    const totalDeceased = deceased.reduce((a, b) => a + b)
    return (
      <div className="home-middle-container">
        <div className="searchbar-holder">
          <BsSearch className="search-icon" />
          <input
            type="search"
            className="searchbar-input"
            placeholder="Enter the State"
            value={searchInput}
            onChange={this.searchInputChange}
          />
        </div>
        {searchList.length !== 0 && searchInput !== '' && (
          <ul className="search-container" testid="searchResultsUnorderedList">
            {searchList.map(eachValue => (
              <Link
                to={`/state/${eachValue.state_code}`}
                className="search-link"
              >
                <li className="search-list-item" key={eachValue.state_code}>
                  <p className="item-name">{eachValue.state_name}</p>
                  <div className="icon-container">
                    <p className="item-code">{eachValue.state_code}</p>
                    <BiChevronRightSquare color="#FACC15" />
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
        <div className="home-result-container">
          <div className="home-top-list">
            <div className="list-item" testid="countryWideConfirmedCases">
              <p className="confirm-card-name">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dwmbbz3pv/image/upload/v1644597326/check-mark_1_mquiyt.svg"
                className="confirm-card-image"
                alt="country wide confirmed cases pic"
              />
              <p className="confirm-card-number">{totalConfirmed}</p>
            </div>
            <div className="list-item" testid="countryWideActiveCases">
              <p className="active-card-name">Active</p>
              <img
                src="https://res.cloudinary.com/dwmbbz3pv/image/upload/v1644597526/protection_1_bavqrt.svg"
                className="active-card-image"
                alt="country wide active cases pic"
              />
              <p className="active-card-number">{totalActive}</p>
            </div>
            <div className="list-item" testid="countryWideRecoveredCases">
              <p className="recovered-card-name">Recovered</p>
              <img
                src="https://res.cloudinary.com/dwmbbz3pv/image/upload/v1644597527/recovered_1_ye9ce4.svg"
                className="recovered-card-image"
                alt="country wide recovered cases pic"
              />
              <p className="recovered-card-number">{totalRecovered}</p>
            </div>
            <div className="list-item" testid="countryWideDeceasedCases">
              <p className="deceased-card-name">Deceased</p>
              <img
                src="https://res.cloudinary.com/dwmbbz3pv/image/upload/v1644597527/breathing_1_zkqrob.svg"
                className="deceased-card-image"
                alt="country wide deceased cases pic"
              />
              <p className="deceased-card-number">{totalDeceased}</p>
            </div>
          </div>
          <div testid="stateWiseCovidDataTable" className="state-table">
            <div className="state-result-heading">
              <div className="state-ul-holder">
                <p className="first-column-title">States/UT</p>
                <button
                  type="button"
                  className="icon-button"
                  onClick={this.ascending}
                  testid="ascendingSort"
                >
                  <FcGenericSortingAsc className="ascending-icon" />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  onClick={this.descending}
                  testid="descendingSort"
                >
                  <FcGenericSortingDesc className="descending-icon" />
                </button>
              </div>
              <p className="general-column-title">Confirmed</p>
              <p className="general-column-title">Active</p>
              <p className="general-column-title">Recovered</p>
              <p className="general-column-title">Deceased</p>
              <p className="general-column-title">Population</p>
            </div>
            <ul className="state-result-table">
              {countriesData.map(eachValue => (
                <li className="state-result-row" key={eachValue.id}>
                  <Link
                    to={`/state/${eachValue.id}`}
                    className="state-link-item"
                  >
                    <p className="name-column">{eachValue.name}</p>
                  </Link>
                  <p className="number-column red">{eachValue.confirmed}</p>
                  <p className="number-column blue">{eachValue.active}</p>
                  <p className="number-column green">{eachValue.recovered}</p>
                  <p className="number-column silver">{eachValue.deceased}</p>
                  <p className="number-column grey">{eachValue.population}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  loaderContainer = () => (
    <div testid="homeRouteLoader" className="loader-container">
      <Loader type="TailSpin" color="#007BFF" width="25px" height="25px" />
    </div>
  )

  checkCondition = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.successView()
      default:
        return this.loaderContainer()
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.checkCondition()}
        <Footer />
      </>
    )
  }
}

export default Home
