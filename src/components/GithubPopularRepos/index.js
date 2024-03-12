import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstaint = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class GithubPopularRepos extends Component {
  state = {
    List: [],
    activeLanguage: languageFiltersData[0].id,
    apiStatus: apiStatusConstaint.initial,
  }

  componentDidMount() {
    this.getList()
  }

  getList = async () => {
    const {activeLanguage} = this.state
    this.setState({apiStatus: apiStatusConstaint.loading})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConstaint.success})
      const fetchedData = await response.json()
      const updatedFetchedData = fetchedData.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({List: updatedFetchedData})
    } else if (response.status_code === 401) {
      this.setState({apiStatus: apiStatusConstaint.failure})
    }
  }

  updateState = id => {
    this.setState({activeLanguage: id}, this.getList)
  }

  renderList = () => {
    const {List} = this.state
    return (
      <ul className="ulll">
        {List.map(eachData => (
          <RepositoryItem details={eachData} key={eachData.id} />
        ))}
      </ul>
    )
  }

  renderListFailure = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )
  render() {
    const {List, activeLanguage, apiStatus} = this.state
    return (
      <div className="main">
        <h1>Popular</h1>
        <ul className="ull">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              language={eachData.language}
              key={eachData.id}
              id={eachData.id}
              updateState={this.updateState}
              isActive={activeLanguage === eachData.id}
            />
          ))}
        </ul>
        {apiStatus === apiStatusConstaint.success && this.renderList()}
        {apiStatus === apiStatusConstaint.failure && this.renderListFailure()}
        {apiStatus === apiStatusConstaint.loading && this.renderLoader()}
      </div>
    )
  }
}

export default GithubPopularRepos
