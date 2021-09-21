import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import PassengerInput from './PassengerInput'
import ListPassenger from './ListPassenger'
import Header from './Header'

import withGraphQL from '../hoc/withGraphQL'

class Home extends Component {
  state = {
    data: [],
    input: ''
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: harusnya object deep equality
    if (prevProps.anggota.data) return

    this.setState((state) => {
      const anggotaFetched = this.props.anggota.data.anggota.map((a) => ({
        ...a,
        jenisKelamin: a.jenis_kelamin
      }))
      return { data: [...state.data, ...anggotaFetched] }
    })
  }

  hapusPengunjung = (id) => {
    this.setState({
      data: [
        ...this.state.data.filter((item) => {
          return item.id !== id
        })
      ]
    })
  }

  tambahPengunjung = (newUser) => {
    const newData = {
      id: uuidv4(),
      ...newUser
    }
    this.setState({
      data: [...this.state.data, newData]
    })
  }

  render() {
    return (
      <>
        {this.props.anggota.loading ? (
          <h1>Fetching data...</h1>
        ) : (
          <div>
            <Header />
            <ListPassenger
              data={this.state.data}
              hapusPengunjung={this.hapusPengunjung}
            />
            <PassengerInput tambahPengunjung={this.tambahPengunjung} />
          </div>
        )}

        <input
          value={this.state.input}
          onChange={(e) => this.setState({ input: e.target.value })}
          type="text"
        />
        <button
          onClick={() => this.props.lazy.getAnggotaById(this.state.input)}
        >
          Cari
        </button>
        <p>{null}</p>
        {this.props.lazy.loading && <h1>Fetching user's data id...</h1>}
        {this.props.lazy.error && <h1>Error fetching user's data :(</h1>}
        {this.props.lazy.data && (
          <>
            <h1>{this.props.lazy.data?.anggota_by_pk.id}</h1>
            <h1>{this.props.lazy.data?.anggota_by_pk.nama}</h1>
            <h1>{this.props.lazy.data?.anggota_by_pk.umur}</h1>
          </>
        )}
      </>
    )
  }
}

export default withGraphQL(Home)
