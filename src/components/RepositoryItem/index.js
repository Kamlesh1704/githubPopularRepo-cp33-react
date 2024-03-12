// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {id, avatarUrl, starsCount, forksCount, name, issuesCount} = details
  return (
    <li>
      <img src={avatarUrl} alt="name" className="image" />
      <h1>{name}</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
        alt="stars"
      />
      <p>{starsCount} stars</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
        alt="forks"
      />
      <p>{forksCount} forks</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
        alt="open issues"
      />
      <p>{issuesCount} open issues</p>
    </li>
  )
}
export default RepositoryItem
