import { Appbar } from "../components/AppBar";
import { BalanceCard } from "../components/Balance";
import { Users } from "../components/Users";
import { Button} from "../components/Button"
// import {User} from "../components/Users";

const Dashboard = () => {
  return (
    <div>
    <Appbar/>
    <BalanceCard/>
    <Users/>
    <Button/>
</div>
)
}

export default Dashboard
