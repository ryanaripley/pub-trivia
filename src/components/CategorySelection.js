import React, { Component } from 'react'

export default class CategorySelection extends Component {
  render() {
    return (
      <div>
        <h3>Choose a category:</h3>
        <ul>
          {this.props.questions
            .filter((question, index) => index < 5)
            .map((question, index) => {
              return (
                <li key={index}>
                  <button onClick={this.props.selectCategory} data-cat={index}>
                    {question.category.title}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
