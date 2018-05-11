import React, {PureComponent} from 'react'
import {getStudents, createBatch} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import './GamesList.css'

class BatchList extends PureComponent {
  // constructor(props){
  //   super(props)
  //   this.state = {endDate: '', startDate: '', batchNumber:0}
  //   this.handleClick = this.handleClick.bind(this)
  //   this.handleChange = this.handleChange.bind(this)
  // }
  componentWillMount() {
    console.log('hello')
    if (this.props.authenticated) {
      if (this.props.students === null) this.props.getStudents(this.props.match.params.id)
      if (this.props.users === null) this.props.getUsers()

    }
  }

  renderStudents = (student) => {
    const {users, history} = this.props

    return (<Card key={student.id} className="game-card">
      <CardContent>

        <Typography variant="headline" component="h2">

          {student.name}
        </Typography>
        <Typography color="textSecondary">


        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => history.push(`/student/${student.id}`)}
        >
          See Student
        </Button>
      </CardActions>
    </Card>)
  }
  handleChange = (event) => {
        const {name, value} = event.target

		this.setState({
          [name]: value
		})
    console.log(this.state.batchNumber)
	}

  // handleClick(){
  //
  //
  //   this.props.createBatch(this.state.batchNumber,this.state.startDate,this.state.endDate);
  //
  // }

  render() {
    const {students, users, authenticated,} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (students === null || users === null) return null

    return (<Paper className="outer-paper">
    <form>
    <input name="startDate" onChange={this.handleChange} type='text' placeholder='Enter Date Start'/><br/>
    <input name="endDate" onChange={this.handleChange} type='text' placeholder='Enter Date End'/><br/>
    <input name="batchNumber" onChange={this.handleChange} type='number' placeholder='Enter batch number'/><br/>
    </form>
      <Button
        color="primary"
        variant="raised"

        className="create-batch"
      >
        Create Student
      </Button>

      <div>
        {students.map(student => this.renderStudents(student))}
      </div>
    </Paper>)
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  students: state.students === null ?
    null : Object.values(state.students).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getStudents, getUsers})(BatchList)
