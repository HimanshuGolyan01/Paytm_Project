import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { Button} from "../components/Button"
// import {User} from "../components/Users";

const Dashboard = () => {
  return (
    <div>
    <Appbar/>
    <Balance/>
    <Users/>
    <Button/>
</div>
)
}

export default Dashboard
