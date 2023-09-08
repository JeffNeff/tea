import {
  Card,
  Grid,
  Text,
  Flex,
  Popover,
  Stack,
  Radio,
  Group,
  TextInput,
  HoverCard,
  Button,
  createStyles,
} from "@mantine/core";
import { useRecoilState } from "recoil";
import SellInput from "./inputs/SellInput";
import RequestInput from "./inputs/RequestInput";
import { TbArrowsSort } from "react-icons/tb";
import { AiFillQuestionCircle } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import web3 from "web3";

import publicPrivateState from "../stateStores/trade/publicPrivateState";
import shippingAddressState from "../stateStores/trade/shippingAddressState";
import returnAddressState from "../stateStores/trade/returnAddressState";
import transactionFeeState from "../stateStores/trade/transactionFeeState";
import sellCurrencyState from "../stateStores/trade/sellCurrencyState";
import sellAmountState from "../stateStores/trade/sellAmountState";
import requestCurrencyState from "../stateStores/trade/requestCurrencyState";
import requestAmountState from "../stateStores/trade/requestAmountState";
import currentOpenOrdersState from "../stateStores/trade/currentOpenOrdersState";
import userMetaMastAccount from "../stateStores/trade/userMetaMaskAccountState";


import "./TradeCard.css";
import ShippingLabel from "./utility/ShippingLabel";
import myNKNAddressState from "../stateStores/trade/myNKNAddressState.js";

export default function TradeCard() {

  // This is a helper function that helps apply styles to the predefined components, allowing you to access
  // inner elements of the components asd
  const useStyles = createStyles((theme) => ({
    icon: {
      "&:checked": {
        color: "#44AF7F",
      },
    },
    input: {
      "&:focus": {
        backgroundColor: "#ECF7F2",
        border: "1px solid #7DC4A6"
      },
    },
    tradeBtnRoot: {
      backgroundColor: "#265A5A",
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#163636"
      }
    }


  }));


  const { classes } = useStyles();
  // The below are from a state management library called Recoil.  The above imports will show the file they come from.
  // Basically, you can import the state into any file, pass it into the useRecoilState function/hook, and then treat it how you would the useState hook
  const [publicState, setPublicState] = useRecoilState(publicPrivateState);
  const [sellerShippingAddress, setSellerShippingAddress] = useRecoilState(shippingAddressState)
  const [sellersRefundAddress, setSellersRefundAddress] = useRecoilState(returnAddressState)
  const [transactionFee, setTransactionFee] = useRecoilState(transactionFeeState)
  const [myNKNAddress, setMyNKNAddress] = useRecoilState(myNKNAddressState);

  const [currency, setCurrency] = useRecoilState(sellCurrencyState)
  const [tradeAsset, setTradeAsset] = useRecoilState(requestCurrencyState)
  const [amount, setAmount] = useRecoilState(sellAmountState)
  const [price, setPrice] = useRecoilState(requestAmountState)
  const [currentOpenOrders, setCurrentOpenOrders] = useRecoilState(currentOpenOrdersState);


  const shippingPopText = "This is an example of  some text that can go in this card"


  const [nftID, setNftID] = useState(1);
  const [txid, setTxid] = useState("");
  const [sellersPaymentTransactionID, setSellersPaymentTransactionID] = useState("");
  const [privateSell, setPrivateSell] = useState(false);
  const [userCurrentPendingPayOrders, setuserCurrentPendingPayOrders] = useState([]);
  const [pendingPayNumberAmmount, setPendingPayNumberAmmount] = useState(0);
  const [userPrivateKeys, setUserPrivateKeys] = useState([]);
  const [showPrivateBuy, setShowPrivateBuy] = useState(false);
  const [tradeInfo, setTradeInfo] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [account, setAccount] = useRecoilState(userMetaMastAccount);
  
  // This is a custom component for the input labels for addresses
  // function ShippingLabel(label, popText) {
  //   return (priceString
  //     <Flex align="center">
  //       <Popover width={280} shadow="md">
  //         <Popover.Target>
  //           <Flex align="center">
  //             <Text size="xs">{label}</Text>
  //             <AiFillQuestionCircle style={{paddingLeft: ".25rem"}} className="shipping-popover" />
  //           </Flex>
  //         </Popover.Target>
  //         <Popover.Dropdown>
  //           <Text size="sm">
  //             {popText}
  //           </Text>
  //         </Popover.Dropdown>
  //       </Popover>

  //     </Flex>
  //   );
  // }

  // /listorders is called to fetch all the open orders from Party
  const listOrders = async () => {
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/list`)
      .then(response => {
        if (response.data) {
          setCurrentOpenOrders(response.data);
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log(error);
        //alert("Error Fetching Open Orders: " + error);
      });
  };


  // /sell is called to create a new sell order
  const sell = async () => {
    // print all variables to console for debugging
    console.log("sell");
    console.log(tradeAsset);
    console.log(amount);
    console.log(currency);
    console.log(price);
    console.log(sellerShippingAddress);
    console.log(myNKNAddress);
    console.log(sellersRefundAddress);
    console.log(privateSell);
    // convert the amount and price into wei
    const amt = parseInt(web3.utils.toWei(amount.toString(), "ether"));
    const prc = parseInt(web3.utils.toWei(price.toString(), "ether"));
    // convert nftID to int
    var nftIDint = parseInt(nftID);
    if (nftIDint == NaN) {
      nftIDint = 0;
    }
    axios
      // .post("http://localhost:8081/sell", {
        .post(`${process.env.REACT_APP_BACKEND_URL}/sell`, {
        tradeAsset: tradeAsset.toLowerCase(),
        amount: amt,
        currency: currency.toLowerCase(),
        price: prc,
        locked: false,
        sellerShippingAddress: sellerShippingAddress,
        sellerNKNAddress: myNKNAddress,
        paymentTransactionID: account,
        refundAddress: sellersRefundAddress,
        private: privateSell,
        // nftID: nftIDint,
      })
      .then(response => {
        console.log(response.data);
        // base64 decode the response]
        //alert("Sell Order Created");
        console.log(response.data);
        listOrders();
      })
      .catch(error => {
        console.log(error);
        //alert("Error Creating Sell Order.. Dont forget to pay your transaction fees: " + error);
      });
  };


  //This is the actual return of the TradeCard function.
  return (
    <Card sx={{ boxShadow: "0px 1px 3px #00000029" }} withBorder shadow="small" radius={"md"}>
      <Card.Section withBorder inheritPadding py="xs">
        <Text size="xl" p="md" style={{ color: "#265A5A" }} weight={700}>Create a New Trade</Text>
      </Card.Section>
      <Grid pt="lg">
        <Grid.Col span={12}>
          <Stack>
            <Text style={{ color: "#265A5A" }} weight={700} size="xs">Sell</Text>
            <SellInput />
          </Stack>
        </Grid.Col>
        <Grid.Col span={12} pt="2rem">
          <Flex justify="center">
            <TbArrowsSort />
          </Flex>
        </Grid.Col>
        <Grid.Col span={12}>
          <Stack>
            <Text style={{ color: "#265A5A" }} weight={700} size="xs">Request</Text>
            <RequestInput />
          </Stack>
        </Grid.Col>
        <Grid.Col span={12} pt="xl">
          <Stack>
            {/* <Radio.Group value={publicState} onChange={setPublicState}>
              <Group>
                <Radio
                  radius="xl"
                  color="green"
                  value="public"
                  label="Public"
                />
                <Radio
                  color="green"
                  radius="xl"
                  value="private"
                  label="Private"
                />
              </Group>
            </Radio.Group> */}
            <Text fs="italic" fz="xs">
              Your trade will be posted to the public marketplace.
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={12} pt="xl">
        <Button my="1rem" radius="xl" classNames={{ root: classes.tradeBtnRoot }} onClick={ sell} fullWidth>Create Trade</Button>
        </Grid.Col>
        {/* <Grid.Col span={12}>
          <Stack>
            <TextInput radius="xl"
              value={sellerShippingAddress}
              onChange={(e) => setSellerShippingAddress(e.target.value)}
              classNames={{ input: classes.input }}
              label={ShippingLabel("Shipping Address", shippingPopText)}
              placeholder="Enter your shipping address"
            />
            <TextInput
              value={sellersRefundAddress}
              radius="xl"
              onChange={(e) => setSellersRefundAddress(e.target.value)}
              placeholder="Enter your return shipping address"
              label={ShippingLabel("Return Shipping Address", shippingPopText)}
              classNames={{ input: classes.input }}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={12}>
          <Stack spacing="xl">
            <div style={{ display: "flex", paddingTop: "1rem" }}>
              <Text size="sm" pr="sm">Transaction fee:</Text> <Text size="sm">${transactionFee}</Text>
            </div>
            <Button my="1rem" radius="xl" classNames={{ root: classes.tradeBtnRoot }} onClick={ sell} fullWidth>Create Trade</Button>

          </Stack>
        </Grid.Col> */}
      </Grid>
    </Card>
  );
}
