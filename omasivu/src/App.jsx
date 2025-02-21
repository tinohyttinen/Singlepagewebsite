import Footer from "./components/Footer.jsx"


const Huomenta = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Huomenta {props.name}, olet {props.age} vuotias!
      </p>
    </div>
  )
}

const Oma = () => {
  return (
    <div>
      <p>
        Terve
      </p>
    </div>
      )
    }

const App = () => {
  const nimi = 'Tony'
  const ika = 27

  return (
    <div>
      <h1>Huomenta!</h1>
      <Huomenta name="Tino" age={15 + 10} />
      <Huomenta name={nimi} age={ika} />
      <Oma />
      <Footer />
    </div>
  )
}

export default App