// Write your code here
import './index.css'

const LanguagefilterItem = props => {
  const {language, id, updateState, isActive} = props
  const classNameActive = isActive ? "activeLang" : ''
  const onChangeLanguage = () => {
    updateState(id)
  }
  return (
    <li >
    <button onClick={onChangeLanguage} className={`${classNameActive}`}>
    {language}
    </button>
    </li>
  )
}

export default LanguagefilterItem
