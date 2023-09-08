import {
  ActionIcon,
  Box,
  Card,
  CopyButton,
  Button,
  Grid,
  Flex,
  Text,
  TextInput,
  createStyles,
  Stack,
  JsonInput,
} from "@mantine/core";
import CryptoIcon from "../utility/CryptoIcon";
import { TbArrowsSort } from "react-icons/tb";
import { RxCopy } from "react-icons/rx";
import ShippingLabel from "../utility/ShippingLabel";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Web3 from "web3";

import tradeInProgressState from '../../stateStores/trade/tradeInProgressState';
import tradeInProgressCurrentOrderState from "../../stateStores/trade/tradeInProgressCurrentOrderState";
import myNKNAddressState from "../../stateStores/trade/myNKNAddressState.js";
import stepStatusState from "../../stateStores/trade/stepStatusState";
import userCurrentPendingPayOrdersState from "../../stateStores/trade/userCurrentPendingPayOrdersState";
import userMetaMastAccount from "../../stateStores/trade/userMetaMaskAccountState";

import "./inprogresscard.css";

export default function InProgressTradeCard() {
  const useStyles = createStyles((theme) => ({
    input: {
      "&:focus": {
        backgroundColor: "#ECF7F2",
        border: "1px solid #7DC4A6",
      },
    },
    btnRoot: {
      backgroundColor: "#265A5A",
      boxShadow: "1px 1px 1px #00000029",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#265A5A",
        border: "1px solid #265A5A",
      },
    },
    cancelBtnRoot: {
      boxShadow: "1px 1px 1px #00000029",
      border: "1px solid #265A5A",
      color: "#265A5A",
    },
  }));

  const { classes } = useStyles();
  const [walletAddress, setWalletAddress] = useState("123123j3y2")
  // let options = ["start", "submitted"]
  const [stepStatus, setStepStatus] = useRecoilState(stepStatusState)

  const [web3, setWeb3] = useState(new Web3());
  const [account, setAccount] = useRecoilState(userMetaMastAccount);

  const [tradeInProgressCurrentOrder, setTradeInProgressCurrentOrderState] = useRecoilState(tradeInProgressCurrentOrderState)
  const [myNKNAddress, setMyNKNAddress] = useRecoilState(myNKNAddressState);
  const [userCurrentPendingPayOrders, setUserCurrentPendingPayOrders] = useRecoilState(userCurrentPendingPayOrdersState);
  const [buyFlow, setBuyFlow] = useRecoilState(tradeInProgressState)

  const [shippingAddress, setShippingAddress] = useState("");
  const [returnAddress, setReturnAddress] = useState("");
  const [firstOrderAddress, setFirstOrderAddress] = useState(null);

  console.log("tradeInProgressCurrentOrder", tradeInProgressCurrentOrder)



  const loadWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      console.error('MetaMask is not installed. Please install MetaMask and try again.');
    }
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0){
        console.log("accounts", accounts);
        setAccount(accounts[0]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('MetaMask is not installed. Please install MetaMask and try again.');
    }
  };

  // /buy
  const AcceptTrade = async () => {
    console.log("trading for: " + tradeInProgressCurrentOrder.txid);

    axios
      // .post("http://localhost:8081/buy", {
        .post(`${process.env.REACT_APP_BACKEND_URL}/buy`, {
        txid: tradeInProgressCurrentOrder.txid,
        buyerNKNAddress: myNKNAddress,
        buyerShippingAddress: shippingAddress,
        paymentTransactionID: account,
        refundAddress: returnAddress,
        tradeAsset: tradeInProgressCurrentOrder.tradeAsset,
      })
      .then(response => {
        // TODO:: display user facing error/success message
        return response.data;
      })
      .catch(error => {
        console.log(error);
        //alert("Error Buying Order.. Dont forget to pay your transaction fees: " + error);
      });
  };

  // useEffect to watch for changes in the currentToPayAddress, if this changes we need to setStepStatus("sendPayment");
  useEffect(() => {
    console.log("userCurrentPendingPayOrders", userCurrentPendingPayOrders)
    if (userCurrentPendingPayOrders.length > 0) {
      console.log("userCurrentPendingPayOrders on send payment status set", userCurrentPendingPayOrders);
      setStepStatus("sendPayment");
    }

    if (userCurrentPendingPayOrders && userCurrentPendingPayOrders.length > 0) {
      setFirstOrderAddress(userCurrentPendingPayOrders[0].address);
    }
  }, [userCurrentPendingPayOrders]);

  useEffect(() => {
    connectMetaMask();
    loadWeb3();
  }, []);

  function condenseAddress(address){
    if (address && address.length > 0){
      return address.substring(0,3) + '...'
    } else {
      return address
    }
  }


  function DynamicCardBottom() {
    switch (stepStatus) {
      case "start":
        return (
          <Grid>
            <Grid.Col span={12}>
              <Text color="#265A5A" py="lg" fw={700}>
                Enter Your Shipping Information
              </Text>
            </Grid.Col>
            {/* TextInputs */}
            <Grid.Col span={12}>
              <TextInput
                label={ShippingLabel(
                  "Shipping Address",
                  "Hey look some cool text"
                )}
                radius="xl"
                classNames={{ input: classes.input }}
                onChange={(e) => setShippingAddress(e.target.value)}
                value={shippingAddress}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label={ShippingLabel(
                  "Return Shipping Address",
                  "Hey look some cool text"
                )}
                radius="xl"
                classNames={{ input: classes.input }}
                onChange={(e) => setReturnAddress(e.target.value)}
                value={returnAddress}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Flex align="center">
                <Text fz="sm" mr="xs">
                  Transaction fee:
                </Text>{" "}
                <Text fz="sm" fw={700}>
                   0 Grams
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={12}>
              <Stack>
                <Button radius="xl" styles={{ root: classes.btnRoot }}
                  onClick={AcceptTrade}
                >
                  Submit
                </Button>
                <Button
                  radius="xl"
                  styles={{ root: classes.cancelBtnRoot }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </Stack>
            </Grid.Col>
          </Grid>
        );
      case "sendPayment":
        return (
          <Grid>
            <Grid.Col span={12}>
              <Stack spacing={50}>
                <Text fw={700} style={{ color: "#265A5A" }}>
                  Send Payment
                </Text>
                <Text fz="sm">
                  Using your {tradeInProgressCurrentOrder.tradeAsset} wallet, send
                  requested payment to the address provided below.:
                </Text>
                <Flex
                  align="center"
                  pl="md"
                  style={{ border: "1px solid #D0D0D0", borderRadius: "100px" }}
                  justify="space-between">
                  <Text style={{ color: "#494949" }}>{ condenseAddress(firstOrderAddress) }</Text>
                  <CopyButton value={firstOrderAddress}>
                    {({ copied, copy }) => (
                      <ActionIcon size="lg" radius="xl" onClick={copy}>
                        <RxCopy />
                      </ActionIcon>
                    )}
                  </CopyButton>
                </Flex>
                <Button radius="xl" styles={{ root: classes.btnRoot }}
                  onClick={() => setStepStatus("submitted")}
                >Done</Button>
              </Stack>
            </Grid.Col>
          </Grid>
        );
      case "submitted":
        return (
          <Stack>
            <Text fz="lg" fw={700} style={{ color: "#44AF7F" }}>You Submitted Payment!</Text>
            <Text fz="sm">Once the seller has submitted their funds and the trade is completed, you will receive a notification in the “My Trades” tab with your provide key to unlock your funds.</Text>
            <Button radius="xl" styles={{ root: classes.btnRoot }}onClick={() => setBuyFlow(false)}>Go to my trades</Button>
          </Stack>
        );
      default:
        return <span>buns</span>;
    }

    // End Block
  }

  return (
    <Card
      sx={{ boxShadow: "0px 1px 3px #00000029" }}
      withBorder
      shadow="small"
      radius={"lg"}
      padding={30}
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Text size="xl" p="md" style={{ color: "#265A5A" }} weight={700}>
          Accepted Trade
        </Text>
      </Card.Section>
      <Grid py="lg">
        <Grid.Col span={12}>
          <Flex direction="column" align="flex-start">
            <Text fz={"sm"} mr={5}>
              Trade ID:
            </Text>
            <Text fz={"sm"} fw={700}>
              {tradeInProgressCurrentOrder.txid}
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text fz="xs" fw={700} mb="lg" style={{ color: "#3D3D3D" }}>Buying</Text>
          <div className="in-progress-trade-display">
            <Flex align="center" ml="sm">
              <CryptoIcon width="24px" height="24px" currency="btc" />
              <Text size="sm" fw={700} ml="sm">
                {tradeInProgressCurrentOrder.currency}
              </Text>
            </Flex>
            <Flex align="center" mr="lg">
              <Text fz="lg" fs="10" fw={700}>
                {tradeInProgressCurrentOrder.amount / 1000000000000000000}
              </Text>
            </Flex>
          </div>
        </Grid.Col>
        {/* Icon */}
        <Grid.Col span={12}>
          <Flex justify="center" pt="sm">
            <TbArrowsSort />
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Text fz="xs" fw={700} mb="lg" style={{ color: "#3D3D3D" }}>Selling</Text>
          <div className="in-progress-trade-display">
            <Flex align="center" ml="sm">
              <CryptoIcon width="24px" height="24px" currency="btc" />
              <Text size="sm" fw={700} ml="sm">
                {tradeInProgressCurrentOrder.tradeAsset}
              </Text>
            </Flex>
            <Flex align="center" mr="lg">
              <Text fz="lg" fs="10" fw={700}>
                {tradeInProgressCurrentOrder.price / 1000000000000000000}
              </Text>
            </Flex>
          </div>
        </Grid.Col>
        {/* Fake Inputs End */}
      </Grid>
      {/* First Step */}
      <DynamicCardBottom />
      {/* End First Step */}
    </Card>
  );
}
