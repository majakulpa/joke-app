import React, { Component } from "react";
import man from "./img/man.jpeg";
import comic from "./img/comic.png";

class JokeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      joke: {
        setup: "",
        punchline: ""
      },
      hasJoke: false
    };
  }

  getRandomJoke = event => {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then(response => response.json())
      .then(data => {
        if (data.setup && data.punchline) {
          let { joke } = this.state;
          let jokeData = data;
          joke.setup = jokeData.setup;
          joke.punchline = jokeData.punchline;
          this.setState({ joke }, () => {
            if (this.state.hasJoke === false) {
              this.setState({ hasJoke: true });
            }
          });
        } else {
          return console.error("No joke has been found 404");
        }
      });
  };

  renderJoke = () => {
    const { setup, punchline } = this.state.joke;
    return (
      <div>
        <h1 className="setup">{setup}</h1>
        <p className="punchline">{punchline}</p>
      </div>
    );
  };

  render() {
    const { hasJoke } = this.state;
    return (
      <div>
        <button onClick={this.getRandomJoke}>Make a Joke</button>
        <div className="joke-photo">
          <img className="man" src={man} alt="Man" />
          <img className="comic" src={comic} alt="Comic" />
          <div className="joke">
            <div className="info">
              {hasJoke === true ? this.renderJoke() : "Say something funny!"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JokeGenerator;
