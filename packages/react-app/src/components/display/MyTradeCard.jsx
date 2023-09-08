import { Flex, Grid, Paper, Table, Text, Badge, Box, Stack, Button } from "@mantine/core";
import CryptoIcon from "../utility/CryptoIcon";
import { BsCheckCircle } from 'react-icons/bs'
import { AiOutlineKey } from 'react-icons/ai'
import userCurrentPendingPayOrdersState from "../../stateStores/trade/userCurrentPendingPayOrdersState";
import { useRecoilState } from "recoil";


function StatusBadge({ status }) {
    return (
        <Badge radius="sm" variant="filled">Awaiting Payment</Badge>
    )
}

function StatusIcon({ status }) {
    if (status === "awaiting") {
        return <BsCheckCircle style={{ fontSize: "2rem", color: "#453EF0" }} />
    } else {
        return <AiOutlineKey style={{ fontSize: "2rem", color: "#D0C93C" }} />
    }
}

function StatusCallout({ status, key }) {

    const cKey = key || null;

    const awaitingBackgroundColor = "#453EF00F"

    const awaitingStyles = {
        border: "2px solid #453EF0",
        borderRadius: "10px",
        background: "#453EF00F 0% 0% no-repeat padding-box;",
        boxShadow: "0px 1px 3px #00000029;",
        minHeight: "5rem"

    }

    const completedStyles = {
        border: "2px solid #D0C93C",
        borderRadius: "10px",
        background: "#D0C93C0A 0% 0% no-repeat padding-box;",
        boxShadow: "0px 1px 3px #00000029;",
        minHeight: "5rem"

    }


    const awatingTextStyles = {
        color: "#453EF0"
    }

    const completedTextStyles = {
        color: "#3D3D3D"
    }

    return (
        <Box p={4} pt="lg" mt="lg" sx={awaitingStyles}>
            <Grid>
                <Grid.Col display="flex" style={{ justifyContent: "center", alignItems: "center" }} span={1}>
                    <StatusIcon status="awaiting" />
                </Grid.Col>
                <Grid.Col span={11}>
                    <Stack spacing="3">
                        <Text style={awatingTextStyles} fz="sm" fw={700}>You Paid!</Text>
                        <Text style={{ color: "#3D3D3D" }} fz="sm">You will be notified once the seller has paid and completed trade.</Text>

                    </Stack>
                </Grid.Col>
            </Grid>
        </Box>

    )

}

function markAsPaid(order) {
    // const [userCurrentPendingPayOrders, setUserCurrentPendingPayOrders] = useRecoilState(userCurrentPendingPayOrdersState);
    console.log("marking as paid")
    console.log(order)
    // // remove the order from the userCurrentPendingPayOrders array
    // userCurrentPendingPayOrders = userCurrentPendingPayOrders.filter((o) => {
    //     return o.address !== order.address
    // })
    // setUserCurrentPendingPayOrders(userCurrentPendingPayOrders)
}


function MyTradeCard({ userCurrentPendingPayOrders }) {
    // console.log("uscpyo" + JSON.stringify(userCurrentPendingPayOrders[0]))
    // example runtime result on the above line: uscpyo{"address":"0xecc56c9e613BcecC6acDd011792E72c3CF2E0B00","amount":"12000000000000000000","network":"grams","privateKey":"","chain":"","error":""}

    // containers contains the list of orders that are awaiting payment
    const Containers = userCurrentPendingPayOrders.map((order, index) => {
        return (
            <Paper sx={{ height: "25rem" }} p="md" shadow={"sm"} radius={"md"}>
                <Grid>
                    <Grid.Col span={12}>
                        <h3 style={{ color: "#265A5A", marginBottom: ".5rem" }}>Awaiting Payment</h3>
                        <Flex>
                            <Text fz={"sm"} mr={5}>Network:</Text><Text fz={"sm"} fw={700}>{order.network}</Text>
                        </Flex>
                        <Flex>
                            <Text fz={"sm"} mr={5}>Amount:</Text><Text fz={"sm"} fw={700}>{order.amount / 1000000000000000000}</Text>
                        </Flex>
                        <Flex>
                            <Text fz={"sm"} mr={5}>Address:</Text><Text fz={"sm"} fw={700}>{order.address}</Text>
                        </Flex>
                        {/* <Flex>
                            <Button onClick={() => { markAsPaid(order) }}>Mark as Paid</Button>
                        </Flex> */}
                    </Grid.Col>
                </Grid>
            </Paper>
        )
    })

    return (
        // display a list of orders that are awaiting payment
        <Paper sx={{ height: "25rem" }} p="md" shadow={"sm"} radius={"md"}>
            {Containers}
        </Paper>

    )
    // <Paper sx={{ height: "25rem" }} p="md" shadow={"sm"} radius={"md"}>
    //     {Containers}
    //     <Grid>
    //         <Grid.Col span={12}>
    //             <h3 style={{ color: "#265A5A", marginBottom: ".5rem" }}>Accepted Trade</h3>
    //             <Flex>
    //                 <Text fz={"sm"} mr={5}>Trade ID:</Text><Text fz={"sm"} fw={700}>234324asdsad3</Text>
    //             </Flex>
    //         </Grid.Col>
    //         <Grid.Col span={12}>
    //             <Table>
    //                 <thead>
    //                     <tr>
    //                         <th>Buying</th>
    //                         <th>Selling</th>
    //                         <th>Added</th>
    //                         <th>Visibility</th>
    //                         <th>Status</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     <tr>
    //                         <td>
    //                             <Flex align={"center"}>
    //                                 <CryptoIcon currency={"BTC"} />
    //                                 <div style={{ marginLeft: ".75rem" }}>
    //                                     <Text fw={700} fz={"xs"}>Bitcoin</Text>
    //                                     <Text fw={700} fz={"xs"}>234.35</Text>
    //                                 </div>
    //                             </Flex>
    //                         </td>
    //                         <td>
    //                             <Flex align={"center"}>
    //                                 <CryptoIcon currency={"BTC"} />
    //                                 <div style={{ marginLeft: ".75rem" }}>
    //                                     <Text fw={700} fz={"xs"}>Bitcoin</Text>
    //                                     <Text fw={700} fz={"xs"}>234.35</Text>
    //                                 </div>
    //                             </Flex>

    //                         </td>
    //                         <td>
    //                             <Text>Added 5 minutes ago</Text>
    //                         </td>
    //                         <td>
    //                             <Text>Public</Text>
    //                         </td>
    //                         <td>
    //                             <Badge radius="sm" variant="filled">Awaiting Payment</Badge>

    //                         </td>
    //                     </tr>
    //                 </tbody>
    //             </Table>

    //         </Grid.Col>
    //         <Grid.Col span={12}>
    //             <StatusCallout />
    //         </Grid.Col>
    //     </Grid>
    // </Paper>

}

export default MyTradeCard