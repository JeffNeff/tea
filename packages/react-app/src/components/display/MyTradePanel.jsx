import { Stack } from "@mantine/core";
import MyTradeCard from "./MyTradeCard";
import userCurrentPendingPayOrdersState from "../../stateStores/trade/userCurrentPendingPayOrdersState";
import { useRecoilState } from "recoil";

function MyTradePanel() {
  const [userCurrentPendingPayOrders, setUserCurrentPendingPayOrders] = useRecoilState(userCurrentPendingPayOrdersState);

  return (
    <Stack>
      <MyTradeCard userCurrentPendingPayOrders={userCurrentPendingPayOrders} />
    </Stack>
  );
}

export default MyTradePanel;