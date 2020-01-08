import React from 'react'
import Loadable from 'react-loadable'

const MyLoadable = (loader) => {
  return Loadable({
    loader,
    loading: () => React.createElement("div", {}),
  })
}
export default MyLoadable

// build file with
// https://babeljs.io/repl
